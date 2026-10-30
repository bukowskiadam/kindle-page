import { parse } from "node-html-parser";

import type { SynonymOfTheDay, SynonymOfTheDayError } from "../../types.js";
import { html } from "../html.js";
import { FONT_WEIGHT } from "../theme.js";

type SynonymProps = {
  synonym: SynonymOfTheDay | SynonymOfTheDayError;
};

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 0",
  fontSize: 16,
} as const;

export function Synonym({ synonym }: SynonymProps) {
  if (synonym.type === "error") {
    return html`<div style=${CONTAINER_STYLE}>${synonym.error}</div>`;
  }

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${htmlToText(synonym.title)}
      </div>
      ${htmlToParagraphs(synonym.description).map(
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

/** The thesaurus scraper returns HTML; each top-level block becomes a paragraph. */
function htmlToParagraphs(markup: string): string[] {
  return parse(markup)
    .childNodes.map((node) => node.text.trim())
    .filter((text) => text.length > 0);
}
