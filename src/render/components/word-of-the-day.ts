import type {
  TextSpan,
  WordOfTheDayData,
  WordOfTheDayError,
} from "../../types.ts";
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
      ${explanation && FormattedParagraph(explanation)}
    </div>
  `;
}

/** `display: block` makes satori flow the spans inline, like a browser. */
function FormattedParagraph(spans: TextSpan[]) {
  return html`
    <div style=${{ display: "block", margin: "8px 0" }}>
      ${spans.map(
        (span, index) =>
          html`<span
            key=${index}
            style=${{
              fontWeight: span.bold ? FONT_WEIGHT.bold : FONT_WEIGHT.regular,
              fontStyle: span.italic ? "italic" : "normal",
            }}
          >
            ${span.text}
          </span>`
      )}
    </div>
  `;
}
