import type { PageData } from "../../page-data.js";
import type { RenderAssets } from "../assets.js";
import { html } from "../html.js";
import { COLORS, FONT_FAMILY, FONT_WEIGHT, PAGE_HEIGHT, PAGE_WIDTH } from "../theme.js";
import { AirlyBar } from "./airly-bar.js";
import { Calendar } from "./calendar.js";
import { Forecast } from "./forecast.js";
import { Header } from "./header.js";
import { StatusBar } from "./status-bar.js";
import { Synonym } from "./synonym.js";

type DashboardProps = {
  data: PageData;
  assets: RenderAssets;
};

const ROOT_STYLE = {
  display: "flex",
  flexDirection: "column",
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
  backgroundColor: COLORS.bg,
  color: COLORS.text,
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHT.regular,
};

const HALF_COLUMN_STYLE = { display: "flex", width: "50%" };

/** PoC: renders the "day" layout regardless of the day mode. */
export function Dashboard({ data, assets }: DashboardProps) {
  return html`
    <div style=${ROOT_STYLE}>
      ${StatusBar({
        time: data.time,
        nextRefreshTime: data.nextRefreshTime,
        refreshSchedule: data.refreshSchedule,
        battery: data.battery,
      })}
      ${Header({ date: data.date, airly: data.airly })}
      ${Forecast({ meteogramDataUri: assets.meteogramDataUri })}
      ${AirlyBar({ airly: data.airly, airlyLogoDataUri: assets.airlyLogoDataUri })}
      <div style=${{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <div style=${HALF_COLUMN_STYLE}>
          ${Calendar({ calendar: data.calendar })}
        </div>
        <div style=${HALF_COLUMN_STYLE}>
          ${data.synonym && Synonym({ synonym: data.synonym })}
        </div>
      </div>
    </div>
  `;
}
