import { parse } from "node-html-parser";

import type { WordOfTheDayData, WordOfTheDayError } from "../../types.ts";
import { html } from "../html.ts";
import { FONT_WEIGHT } from "../theme.ts";

type WordOfTheDayProps = {
  wordOfTheDay: WordOfTheDayData | WordOfTheDayError;
};

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 0",
  fontSize: 16,
} as const;

export function WordOfTheDay({ wordOfTheDay }: WordOfTheDayProps) {
  if (wordOfTheDay.type === "error") {
    return html`<div style=${CONTAINER_STYLE}>${wordOfTheDay.error}</div>`;
  }

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${htmlToText(wordOfTheDay.title)}
      </div>
      ${htmlToParagraphs(wordOfTheDay.description).map(
        (paragraph, index) =>
          html`<div key=${index} style=${{ display: "flex", margin: "8px 0" }}>
            ${paragraph}
          </div>`
      )}
    </div>
  `;
}

function htmlToText(markup: string): string {
  return parse(markup).text.trim();
}

/** The dictionary.com scraper returns HTML; each top-level block becomes a paragraph. */
function htmlToParagraphs(markup: string): string[] {
  return parse(markup)
    .childNodes.map((node) => node.text.trim())
    .filter((text) => text.length > 0);
}
