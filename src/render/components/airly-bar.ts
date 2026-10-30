import type { ReactNode } from "react";

import type { AirlyData, AirlyError } from "../../types.js";
import { html } from "../html.js";
import { COLORS, FONT_WEIGHT } from "../theme.js";

const AIRLY_LOGO = { width: 80, height: 25 } as const;

type AirlyBarProps = {
  airly: AirlyData | AirlyError;
  airlyLogoDataUri: string;
};

type CellOptions = {
  children: ReactNode;
  grow?: boolean;
  alignStart?: boolean;
  padding?: string;
};

export function AirlyBar({ airly, airlyLogoDataUri }: AirlyBarProps) {
  const logoCell: CellOptions = {
    grow: false,
    padding: "0 10px",
    children: html`<img
      src=${airlyLogoDataUri}
      width=${AIRLY_LOGO.width}
      height=${AIRLY_LOGO.height}
    />`,
  };
  const cells = [
    logoCell,
    ...(airly.type === "data" ? dataCells(airly) : errorCells(airly)),
  ];

  return html`
    <div
      style=${{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        height: 46,
        fontSize: 18,
        borderTop: `2px solid ${COLORS.alternativeBg}`,
        borderBottom: `2px solid ${COLORS.alternativeBg}`,
      }}
    >
      ${cells.map(Cell)}
    </div>
  `;
}

/** Every second cell gets the alternative background (striped bar). */
function Cell(
  { children, grow = true, alignStart, padding = "0 5px" }: CellOptions,
  index: number
) {
  const isStriped = index % 2 === 1;

  return html`
    <div
      key=${index}
      style=${{
        display: "flex",
        flexDirection: "column",
        flexGrow: grow ? 1 : 0,
        alignItems: alignStart ? "flex-start" : "center",
        justifyContent: "center",
        padding,
        backgroundColor: isStriped ? COLORS.alternativeBg : COLORS.bg,
      }}
    >
      ${children}
    </div>
  `;
}

function Legend(text: string) {
  return html`
    <div style=${{ display: "flex", fontSize: 12, color: COLORS.textDim }}>
      ${text}
    </div>
  `;
}

function Value(text: string | number) {
  return html`<div style=${{ display: "flex" }}>${text}</div>`;
}

function dataCells(airly: AirlyData): CellOptions[] {
  const percent = (value: number) => `${Math.trunc(value)}%`;

  return [
    {
      children: html`
        <div style=${{ display: "flex", fontSize: 20, gap: 6 }}>
          <span>${`${airly.airQuality.label}:`}</span>
          <span style=${{ fontWeight: FONT_WEIGHT.bold }}>
            ${Math.trunc(airly.airQuality.value)}
          </span>
        </div>
      `,
    },
    { children: [Legend("PM 2.5"), Value(percent(airly.pm25.percent))] },
    { children: [Legend("PM 10"), Value(percent(airly.pm10.percent))] },
    { children: [Legend("Humid"), Value(percent(airly.humidity))] },
    { children: [Value(Math.trunc(airly.pressure)), Legend("hPa")] },
  ];
}

function errorCells(airly: AirlyError): CellOptions[] {
  const errorText = (text: string) =>
    html`<div style=${{ display: "flex", fontSize: 16 }}>${text}</div>`;

  return [
    { grow: false, children: errorText("Error:") },
    { alignStart: true, children: errorText(airly.error) },
  ];
}
