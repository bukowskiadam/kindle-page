import type { GospelData, GospelError } from "../../types.ts";
import { html } from "../html.ts";
import { FONT_WEIGHT } from "../theme.ts";

type GospelOfTheDayProps = {
  gospel: GospelData | GospelError;
};

/** From the most to the least readable; the first one that fits the whole reading wins. */
const FONT_SIZES_PX = [16, 15, 14, 13, 12];
const LINE_HEIGHT = 1.3;
/** Space for the reading in the half column, below a two-line heading. */
const TEXT_AREA_WIDTH_PX = 284;
const TEXT_AREA_HEIGHT_PX = 440;
/**
 * Average width of a character relative to the font size, including the
 * space lost to word wrapping; measured on rendered readings.
 */
const AVERAGE_CHAR_WIDTH_EM = 0.57;

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 0",
  fontSize: 16,
} as const;

type TextFit = {
  fontSize: number;
  /** Longer readings are cut after this many lines with an ellipsis. */
  maxLines: number;
};

export function GospelOfTheDay({ gospel }: GospelOfTheDayProps) {
  if (gospel.type === "error") {
    return html`<div style=${CONTAINER_STYLE}>${gospel.error}</div>`;
  }

  const { fontSize, maxLines } = fitText(gospel.text);

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${gospel.reference}
      </div>
      <div
        style=${{
          display: "block",
          margin: "8px 0",
          fontSize,
          lineHeight: LINE_HEIGHT,
          lineClamp: maxLines,
        }}
      >
        ${gospel.text}
      </div>
    </div>
  `;
}

/**
 * Satori can't measure text before layout, so the fit is estimated from the
 * text length. Falls back to the smallest font when nothing fits.
 */
function fitText(text: string): TextFit {
  const fits = FONT_SIZES_PX.map(textFitFor);

  return fits.find((fit) => capacityOf(fit) >= text.length) ?? fits.at(-1)!;
}

function textFitFor(fontSize: number): TextFit {
  return {
    fontSize,
    maxLines: Math.floor(TEXT_AREA_HEIGHT_PX / (fontSize * LINE_HEIGHT)),
  };
}

function capacityOf({ fontSize, maxLines }: TextFit): number {
  const charsPerLine = Math.floor(
    TEXT_AREA_WIDTH_PX / (fontSize * AVERAGE_CHAR_WIDTH_EM)
  );

  return maxLines * charsPerLine;
}
