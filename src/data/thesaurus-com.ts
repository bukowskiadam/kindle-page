import axios from "axios";
import { SynonymOfTheDay, SynonymOfTheDayError } from "../types.js";
import { parse } from "node-html-parser";

export async function getSynonymOfTheDay(): Promise<
  SynonymOfTheDay | SynonymOfTheDayError
> {
  const response = await axios.get(
    "https://www.thesaurus.com/e/synonym-of-the-day/"
  );
  let title, description;

  if (response.status === 200) {
    const document = parse(response.data);
    const synonym = document.querySelector(".sotd-item-wrapper-content");

    title = synonym?.querySelectorAll(" h2.sotd-item__desc-title")?.toString();

    description = synonym
      ?.querySelector("div.sotd-item__description")
      ?.toString()
      .replaceAll("✅", "");

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
