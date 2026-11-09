import type {
  DailyPhrase,
  DailyEnglish as DailyEnglishData,
  EnglishReview,
  ReviewPhrase,
} from "../../types.ts";
import { html } from "../html.ts";
import { COLORS, FONT_WEIGHT } from "../theme.ts";

type DailyEnglishProps = {
  dailyEnglish: DailyEnglishData;
};

/** Fills the column, so the review sits at its bottom. */
const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  fontSize: 16,
} as const;

const SECTION_STYLE = { display: "flex", flexDirection: "column" } as const;

const SECTION_TITLE_STYLE = {
  display: "flex",
  justifyContent: "center",
  padding: "4px 8px",
  fontSize: 18,
  fontWeight: FONT_WEIGHT.bold,
  borderBottom: `1px solid ${COLORS.textDim}`,
} as const;

/** Smaller than the new phrases, so the review fits below them on long days. */
const REVIEW_FONT_SIZE = 14;
/** The weekend review fills the whole column, so it has room for larger text. */
const WEEKEND_REVIEW_FONT_SIZE = 16;

const REVIEW_PHRASE_STYLE = { ...SECTION_STYLE, padding: "2px 8px" } as const;
/** The weekend review has the whole column, so it spaces the phrases out. */
const WEEKEND_REVIEW_PHRASE_STYLE = { ...SECTION_STYLE, padding: "2px 8px 6px" } as const;

const WEEKDAY_HEADING_STYLE = {
  display: "flex",
  padding: "4px 8px 0",
  fontSize: 14,
  color: COLORS.textDim,
  borderTop: `1px solid ${COLORS.textDim}`,
} as const;

const PARAGRAPH_STYLE = { display: "flex", margin: "8px 0 0" } as const;

export function DailyEnglish({ dailyEnglish }: DailyEnglishProps) {
  const { title, phrases, review } = dailyEnglish;

  if (phrases.length === 0) {
    return html`
      <div style=${CONTAINER_STYLE}>${WeekendReview({ review })}</div>
    `;
  }

  return html`
    <div style=${CONTAINER_STYLE}>
      <div style=${SECTION_STYLE}>
        <div style=${SECTION_TITLE_STYLE}>${title}</div>
        ${phrases.map((dailyPhrase, index) =>
          PhraseCard({ dailyPhrase, index, isLast: index === phrases.length - 1 })
        )}
      </div>
      ${Review({ review })}
    </div>
  `;
}

type ReviewProps = {
  review: EnglishReview;
};

function Review({ review }: ReviewProps) {
  return html`
    <div
      style=${{
        ...SECTION_STYLE,
        fontSize: REVIEW_FONT_SIZE,
        borderTop: `1px solid ${COLORS.textDim}`,
      }}
    >
      <div style=${{ ...SECTION_TITLE_STYLE, fontSize: 16 }}>${review.title}</div>
      ${review.days.flatMap(({ phrases }) =>
        ReviewPhrases({ phrases, style: REVIEW_PHRASE_STYLE })
      )}
    </div>
  `;
}

function WeekendReview({ review }: ReviewProps) {
  return html`
    <div style=${{ ...SECTION_STYLE, fontSize: WEEKEND_REVIEW_FONT_SIZE }}>
      <div style=${SECTION_TITLE_STYLE}>${review.title}</div>
      ${review.days.map(
        ({ weekday, phrases }, index) => html`
          <div
            key=${weekday}
            style=${{
              ...WEEKDAY_HEADING_STYLE,
              borderTop: index === 0 ? "none" : WEEKDAY_HEADING_STYLE.borderTop,
            }}
          >
            ${weekday}
          </div>
          ${ReviewPhrases({ phrases, style: WEEKEND_REVIEW_PHRASE_STYLE })}
        `
      )}
    </div>
  `;
}

type ReviewPhrasesProps = {
  phrases: ReviewPhrase[];
  style: Record<string, string | number>;
};

function ReviewPhrases({ phrases, style }: ReviewPhrasesProps) {
  return phrases.map(
    ({ phrase, example }, index) => html`
      <div key=${index} style=${style}>
        <div style=${{ display: "flex", fontWeight: FONT_WEIGHT.bold }}>
          ${phrase}
        </div>
        <div style=${{ display: "flex", fontStyle: "italic" }}>${example}</div>
      </div>
    `
  );
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
