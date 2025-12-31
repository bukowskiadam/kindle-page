import axios from "axios";
import { parse } from "node-html-parser";
import type { SynonymOfTheDay, SynonymOfTheDayError } from "../types.js";

export async function getSynonymOfTheDay(): Promise<
  SynonymOfTheDay | SynonymOfTheDayError
> {
  const response = await axios.get(
    "https://www.dictionary.com/word-of-the-day"
  );
  let title: string | undefined,
    definition: string | undefined,
    pos: string | undefined,
    explanation: string | undefined;

  if (response.status === 200) {
    const document = parse(response.data);
    const container = document.querySelector(".wotd-entry-wrapper");

    title = container
      ?.querySelector(".wotd-entry-headword")
      ?.textContent.trim();

    pos = container?.querySelector(".wotd-entry-pos")?.textContent.trim();

    if (title) {
      title = `<h2 style="text-align: left;">${title}</h2>`;
    }

    definition = container
      ?.querySelector(".wotd-entry-definition")
      ?.textContent.trim();

    explanation = container
      ?.querySelector(".wotd-entry-explanation-section p")
      ?.toString();

    if (title && definition) {
      return {
        type: "data",
        title,
        description: `<p>[${pos}] ${definition}</p>${explanation ?? ""}`,
      };
    }
  }

  const error =
    response.status !== 200
      ? `Failed to fetch data: Status code ${response.status}.`
      : !title
      ? "Failed to parse title."
      : !definition
      ? "Failed to parse description."
      : "Unknown error.";

  return {
    type: "error",
    error,
  };
}
