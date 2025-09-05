import axios from "axios";
import { parse } from "node-html-parser";
import type { SynonymOfTheDay, SynonymOfTheDayError } from "../types.js";

export async function getSynonymOfTheDay(): Promise<
  SynonymOfTheDay | SynonymOfTheDayError
> {
  const response = await axios.get(
    "https://www.dictionary.com/e/word-of-the-day/"
  );
  let title: string | undefined, description: string | undefined;

  if (response.status === 200) {
    const document = parse(response.data);
    const synonym = document.querySelector(".otd-item-wrapper-content");

    title = synonym
      ?.querySelectorAll("h1.js-fit-text")?.[0]
      ?.textContent.trim();

    if (title) {
      title = `<h2 style="text-align: left;">${title}</h2>`;
    }

    description = synonym
      ?.querySelector("div.otd-item-headword__pos")
      ?.toString();

    if (title && description) {
      return {
        type: "data",
        title,
        description,
      };
    }
  }

  const error =
    response.status !== 200
      ? `Failed to fetch data: Status code ${response.status}.`
      : !title
      ? "Failed to parse title."
      : !description
      ? "Failed to parse description."
      : "Unknown error.";

  return {
    type: "error",
    error,
  };
}
