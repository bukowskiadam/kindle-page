import axios from "axios";
import { parse } from "node-html-parser";

import { formatCompactDay } from "../date.ts";
import type { GospelData, GospelError } from "../types.ts";

const EVANGELIZO_READER_URL = "https://feed.evangelizo.org/v2/reader.php";
/** Polish translation and the Roman calendar used in Poland. */
const EVANGELIZO_LANGUAGE = "PL";
const GOSPEL_CONTENT = "GSP";
const READING_TITLE_TYPE = "reading_lt";
const READING_TEXT_TYPE = "reading";
/** The reading is followed by a blank line and the copyright/newsletter notes. */
const FOOTER_SEPARATOR = "<br /><br />";
const LINE_BREAK = /<br\s*\/?>/i;
const TRAILING_PERIOD = /\.$/;
const ERROR_PAGE_MARKER = /<html/i;

/**
 * Gospel of the day from the Evangelizo reader feed
 * (liturgical Biblia Tysiąclecia translation).
 */
export async function getGospelOfTheDay(
  now: Date
): Promise<GospelData | GospelError> {
  const date = formatCompactDay(now);

  try {
    const [titleHtml, textHtml] = await Promise.all([
      fetchGospel(date, READING_TITLE_TYPE),
      fetchGospel(date, READING_TEXT_TYPE),
    ]);

    return parseGospel(titleHtml, textHtml);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    return gospelError(`Failed to fetch the gospel: ${reason}`);
  }
}

async function fetchGospel(date: string, type: string): Promise<string> {
  const response = await axios.get<string>(EVANGELIZO_READER_URL, {
    params: {
      date,
      type,
      lang: EVANGELIZO_LANGUAGE,
      content: GOSPEL_CONTENT,
    },
    responseType: "text",
  });

  // invalid params are reported with status 200 and a full HTML help page
  if (ERROR_PAGE_MARKER.test(response.data)) {
    throw new Error(`Evangelizo rejected the request for ${type} on ${date}`);
  }

  return response.data;
}

export function parseGospel(
  titleHtml: string,
  textHtml: string
): GospelData | GospelError {
  const reference = htmlToText(titleHtml).replace(TRAILING_PERIOD, "");
  const [reading] = textHtml.split(FOOTER_SEPARATOR);
  const text = reading
    .split(LINE_BREAK)
    .map(htmlToText)
    .filter((line) => line.length > 0)
    .join(" ");

  if (!reference) {
    return gospelError("Failed to parse the gospel reference.");
  }

  if (!text) {
    return gospelError("Failed to parse the gospel text.");
  }

  return { type: "data", reference, text };
}

/** Strips tags, decodes entities and collapses whitespace. */
function htmlToText(html: string): string {
  return parse(html).textContent.replace(/\s+/g, " ").trim();
}

function gospelError(error: string): GospelError {
  return { type: "error", error };
}
