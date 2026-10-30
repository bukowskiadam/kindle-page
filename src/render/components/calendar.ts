import type { CalendarApiDayData, PreparedCalendarData } from "../../types.js";
import { html } from "../html.js";
import { COLORS, FONT_WEIGHT } from "../theme.js";

const EVENT_STYLE = { display: "flex", margin: "3px 0 0 16px" } as const;

type CalendarDay = PreparedCalendarData[number];

export function Calendar({ calendar }: { calendar: PreparedCalendarData }) {
  return html`
    <div
      style=${{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontSize: 18,
        lineHeight: "20px",
        padding: "0 8px",
      }}
    >
      ${calendar.map((day, dayIndex) =>
        Day(day, {
          isFirst: dayIndex === 0,
          isLast: dayIndex === calendar.length - 1,
        })
      )}
    </div>
  `;
}

function Day(
  day: CalendarDay,
  { isFirst, isLast }: { isFirst: boolean; isLast: boolean }
) {
  return html`
    <div
      key=${day.day}
      style=${{
        display: "flex",
        flexDirection: "column",
        padding: "4px 0",
        color: isFirst ? COLORS.textDim : COLORS.text,
        borderBottom: isLast ? "none" : `1px solid ${COLORS.textDim}`,
      }}
    >
      <div
        style=${{
          display: "flex",
          fontWeight: FONT_WEIGHT.bold,
          textTransform: "capitalize",
        }}
      >
        ${day.day}
      </div>
      ${eventLines(day).map(
        (line, index) =>
          html`<div key=${index} style=${EVENT_STYLE}>${line}</div>`
      )}
      ${day.noEvents &&
      html`<div style=${{ ...EVENT_STYLE, color: COLORS.textDim }}>
        brak wydarzeń
      </div>`}
    </div>
  `;
}

function eventLines(day: CalendarApiDayData<string>): string[] {
  return [
    ...day.allDay.map((event) => event.title),
    ...day.time.map((event) => `${event.start} - ${event.end}: ${event.title}`),
  ];
}
