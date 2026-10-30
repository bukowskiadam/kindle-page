import type { GospelData, GospelError } from "../../types.ts";
import { html } from "../html.ts";
import { FONT_WEIGHT } from "../theme.ts";

type GospelOfTheDayProps = {
  gospel: GospelData | GospelError;
};

/** Lines that fit below the heading in the half column; longer readings end with an ellipsis. */
const MAX_TEXT_LINES = 20;

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 0",
  fontSize: 16,
} as const;

const TEXT_STYLE = {
  display: "block",
  margin: "8px 0",
  lineClamp: MAX_TEXT_LINES,
} as const;

export function GospelOfTheDay({ gospel }: GospelOfTheDayProps) {
  if (gospel.type === "error") {
    return html`<div style=${CONTAINER_STYLE}>${gospel.error}</div>`;
  }

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${gospel.reference}
      </div>
      <div style=${TEXT_STYLE}>${gospel.text}</div>
    </div>
  `;
}
