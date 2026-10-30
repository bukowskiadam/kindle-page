import type { AirlyData, AirlyError } from "../../types.ts";
import { html } from "../html.ts";
import { COLORS, FONT_WEIGHT } from "../theme.ts";

type HeaderProps = {
  date: string;
  airly: AirlyData | AirlyError;
};

export function Header({ date, airly }: HeaderProps) {
  return html`
    <div style=${{ display: "flex", flexDirection: "row" }}>
      <div
        style=${{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          margin: "8px 0",
          fontSize: 40,
          lineHeight: "48px",
          letterSpacing: 1,
          fontWeight: FONT_WEIGHT.bold,
          textTransform: "capitalize",
        }}
      >
        ${date}
      </div>
      ${airly.type === "data" &&
      html`
        <div
          style=${{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            fontSize: 40,
            fontWeight: FONT_WEIGHT.bold,
            backgroundColor: COLORS.alternativeBg,
          }}
        >
          ${`${airly.temperature}°C`}
        </div>
      `}
    </div>
  `;
}
