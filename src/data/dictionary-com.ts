import axios from "axios";
import { parse } from "node-html-parser";
import type { WordOfTheDayData, WordOfTheDayError } from "../types.ts";
import { htmlToTextSpans } from "./html-text-spans.ts";

const WORD_OF_THE_DAY_URL = "https://www.dictionary.com/word-of-the-day";
const HTTP_STATUS_OK = 200;

export async function getWordOfTheDay(): Promise<
  WordOfTheDayData | WordOfTheDayError
> {
  const response = await axios.get(WORD_OF_THE_DAY_URL);

  if (response.status !== HTTP_STATUS_OK) {
    return wordOfTheDayError(
      `Failed to fetch data: Status code ${response.status}.`
    );
  }

  const container = parse(response.data).querySelector(".wotd-entry-wrapper");
  const textOf = (selector: string) =>
    container?.querySelector(selector)?.textContent.trim() || undefined;

  const word = textOf(".wotd-entry-headword");
  const definition = textOf(".wotd-entry-definition");

  if (!word) {
    return wordOfTheDayError("Failed to parse the word.");
  }

  if (!definition) {
    return wordOfTheDayError("Failed to parse the definition.");
  }

  const explanationParagraph = container?.querySelector(
    ".wotd-entry-explanation-section p"
  );

  return {
    type: "data",
    word,
    partOfSpeech: textOf(".wotd-entry-pos"),
    definition,
    explanation: explanationParagraph
      ? htmlToTextSpans(explanationParagraph)
      : undefined,
  };
}

function wordOfTheDayError(error: string): WordOfTheDayError {
  return { type: "error", error };
}
