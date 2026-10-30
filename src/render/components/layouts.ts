import type { ReactNode } from "react";

import type { PageData } from "../../page-data.ts";
import type { DayMode } from "../../types.ts";
import type { RenderAssets } from "../assets.ts";
import { html } from "../html.ts";
import { AirlyBar } from "./airly-bar.ts";
import { BottomImage } from "./bottom-image.ts";
import { Calendar } from "./calendar.ts";
import { Forecast } from "./forecast.ts";
import { Header } from "./header.ts";
import { NightMessage } from "./night-message.ts";
import { StatusBar } from "./status-bar.ts";
import { Synonym } from "./synonym.ts";

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
