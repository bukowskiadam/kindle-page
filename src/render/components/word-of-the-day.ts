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

const PARAGRAPH_STYLE = { display: "flex", margin: "8px 0" } as const;

export function WordOfTheDay({ wordOfTheDay }: WordOfTheDayProps) {
  if (wordOfTheDay.type === "error") {
    return html`<div style=${CONTAINER_STYLE}>${wordOfTheDay.error}</div>`;
  }

  const { word, partOfSpeech, definition, explanation } = wordOfTheDay;
  const definitionLine = partOfSpeech
    ? `[${partOfSpeech}] ${definition}`
    : definition;

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${word}
      </div>
      <div style=${PARAGRAPH_STYLE}>${definitionLine}</div>
      ${explanation && html`<div style=${PARAGRAPH_STYLE}>${explanation}</div>`}
    </div>
  `;
}
