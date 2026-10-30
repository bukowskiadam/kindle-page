import type { ReactNode } from "react";

import type { PageData } from "../../page-data.js";
import type { DayMode } from "../../types.js";
import type { RenderAssets } from "../assets.js";
import { html } from "../html.js";
import { AirlyBar } from "./airly-bar.js";
import { BottomImage } from "./bottom-image.js";
import { Calendar } from "./calendar.js";
import { Forecast } from "./forecast.js";
import { Header } from "./header.js";
import { NightMessage } from "./night-message.js";
import { StatusBar } from "./status-bar.js";
import { Synonym } from "./synonym.js";

export type LayoutProps = {
  data: PageData;
  assets: RenderAssets;
};

export type Layout = {
  /** Whether the yr.no meteogram has to be fetched for this layout. */
  withMeteogram: boolean;
  render: (props: LayoutProps) => ReactNode;
};

const HALF_COLUMN_STYLE = { display: "flex", width: "50%" };

function Top({ data }: LayoutProps) {
  return [
    StatusBar({
      time: data.time,
      nextRefreshTime: data.nextRefreshTime,
      refreshSchedule: data.refreshSchedule,
      battery: data.battery,
    }),
    Header({ date: data.date, airly: data.airly }),
  ];
}

function Airly({ data, assets }: LayoutProps) {
  return AirlyBar({ airly: data.airly, airlyLogoDataUri: assets.airlyLogoDataUri });
}

function requireMeteogram(assets: RenderAssets): string {
  if (!assets.meteogramDataUri) {
    throw new Error("Layout shows the forecast, but the meteogram was not loaded");
  }

  return assets.meteogramDataUri;
}

function DayContent(props: LayoutProps) {
  const { data, assets } = props;

  return [
    ...Top(props),
    Forecast({ meteogramDataUri: requireMeteogram(assets) }),
    Airly(props),
    html`
      <div style=${{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <div style=${HALF_COLUMN_STYLE}>${Calendar({ calendar: data.calendar })}</div>
        <div style=${HALF_COLUMN_STYLE}>
          ${data.synonym && Synonym({ synonym: data.synonym })}
        </div>
      </div>
    `,
  ];
}

function EveningContent(props: LayoutProps) {
  return [...DayContent(props), BottomImage({ image: props.assets.images.groomingCat })];
}

function NightContent(props: LayoutProps) {
  return [
    ...Top(props),
    NightMessage({ image: props.assets.images.sleepingKitty }),
    Airly(props),
  ];
}

const DAY_LAYOUT: Layout = { withMeteogram: true, render: DayContent };

const LAYOUTS: Record<DayMode, Layout> = {
  morning: DAY_LAYOUT,
  day: DAY_LAYOUT,
  evening: { withMeteogram: true, render: EveningContent },
  night: { withMeteogram: false, render: NightContent },
};

export function layoutFor(dayMode: DayMode): Layout {
  return LAYOUTS[dayMode];
}
