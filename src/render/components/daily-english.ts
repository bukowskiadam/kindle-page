import type { DailyPhrase, DailyEnglish as DailyEnglishData } from "../../types.ts";
import { html } from "../html.ts";
import { COLORS, FONT_WEIGHT } from "../theme.ts";

type DailyEnglishProps = {
  dailyEnglish: DailyEnglishData;
};

const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  fontSize: 16,
} as const;

const PARAGRAPH_STYLE = { display: "flex", margin: "8px 0 0" } as const;

export function DailyEnglish({ dailyEnglish }: DailyEnglishProps) {
  const { title, phrases } = dailyEnglish;

  return html`
    <div style=${CONTAINER_STYLE}>
      <div
        style=${{
          display: "flex",
          justifyContent: "center",
          padding: "4px 8px",
          fontSize: 18,
          fontWeight: FONT_WEIGHT.bold,
          borderBottom: `1px solid ${COLORS.textDim}`,
        }}
      >
        ${title}
      </div>
      ${phrases.map((dailyPhrase, index) =>
        PhraseCard({ dailyPhrase, index, isLast: index === phrases.length - 1 })
      )}
    </div>
  `;
}

type PhraseCardProps = {
  dailyPhrase: DailyPhrase;
  index: number;
  isLast: boolean;
};

function PhraseCard({ dailyPhrase, index, isLast }: PhraseCardProps) {
  const { category, phrase, meaning, example, polish } = dailyPhrase;

  return html`
    <div
      key=${index}
      style=${{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        borderBottom: isLast ? "none" : `1px solid ${COLORS.textDim}`,
      }}
    >
      <div style=${{ display: "flex", fontSize: 14, color: COLORS.textDim }}>
        ${category}
      </div>
      <div style=${{ display: "flex", fontSize: 18, fontWeight: FONT_WEIGHT.bold }}>
        ${phrase}
      </div>
      <div style=${PARAGRAPH_STYLE}>${meaning}</div>
      <div style=${{ ...PARAGRAPH_STYLE, fontStyle: "italic" }}>${example}</div>
      <div style=${{ ...PARAGRAPH_STYLE, color: COLORS.textDim }}>PL: ${polish}</div>
    </div>
  `;
}
