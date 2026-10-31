import { html } from "../html.ts";
import { COLORS, FONT_WEIGHT } from "../theme.ts";

const BATTERY_BORDER_PX = 3;
const BATTERY_BODY_WIDTH_PX = 29;
const BATTERY_HEIGHT_PX = 15;
// The tip doubles as the body's right wall, as in the original clip-path design.
const BATTERY_TIP = { width: 3, height: 9 } as const;

type StatusBarProps = {
  time: string;
  nextRefreshTime: string;
  refreshSchedule: string;
  battery?: number;
};

const DIM = { color: COLORS.textDim };

export function StatusBar({
  time,
  nextRefreshTime,
  refreshSchedule,
  battery,
}: StatusBarProps) {
  return html`
    <div
      style=${{
        display: "flex",
        fontSize: 16,
        fontWeight: FONT_WEIGHT.bold,
        lineHeight: "19px",
        padding: "2px 8px",
        borderBottom: `1px solid ${COLORS.textDim}`,
      }}
    >
      <div style=${{ display: "flex", gap: 4 }}>
        <span style=${DIM}>Updated:</span>
        <span>${time}</span>
        <span style=${DIM}>${`Next: ${nextRefreshTime}`}</span>
      </div>
      <div style=${{ display: "flex", marginLeft: "auto", ...DIM }}>
        ${`Schedule: ${refreshSchedule}`}
      </div>
      <div style=${{ display: "flex", marginLeft: "auto", alignItems: "center" }}>
        ${BatteryIcon(battery ?? 0)}
        <span style=${{ marginLeft: 4, width: 40, justifyContent: "flex-end" }}>
          ${`${battery ?? "-- "}%`}
        </span>
      </div>
    </div>
  `;
}

function BatteryIcon(percent: number) {
  return html`
    <div style=${{ display: "flex", alignItems: "center" }}>
      <div
        style=${{
          display: "flex",
          width: BATTERY_BODY_WIDTH_PX,
          height: BATTERY_HEIGHT_PX,
          boxSizing: "border-box",
          border: `${BATTERY_BORDER_PX}px solid ${COLORS.text}`,
          borderRight: "none",
        }}
      >
        <div style=${{ width: `${percent}%`, backgroundColor: COLORS.text }} />
      </div>
      <div
        style=${{
          width: BATTERY_TIP.width,
          height: BATTERY_TIP.height,
          backgroundColor: COLORS.text,
        }}
      />
    </div>
  `;
}
