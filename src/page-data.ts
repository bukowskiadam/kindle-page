import { getAirlyData } from "./data/airly-cached.js";
import { getCalendarData } from "./data/calendar.js";
import { getSynonymOfTheDay } from "./data/thesaurus-com.js";
import { formatDate, formatTime, getNow } from "./date.js";
import {
  getCurrentRefreshSchedule,
  getDayMode,
  getNextRefreshTime,
  getSecondsToNextRefresh,
  validateDayMode,
} from "./schedule.js";
import type {
  AirlyData,
  AirlyError,
  DayMode,
  PreparedCalendarData,
  RefreshSchedule,
  SynonymOfTheDay,
  SynonymOfTheDayError,
} from "./types.js";

const MODES_WITH_SYNONYM: DayMode[] = ["day", "morning", "evening"];

export type PageDataSources = {
  getCalendarData: typeof getCalendarData;
  getAirlyData: () => Promise<AirlyData | AirlyError>;
  getSynonymOfTheDay: typeof getSynonymOfTheDay;
};

const DEFAULT_SOURCES: PageDataSources = {
  getCalendarData,
  getAirlyData,
  getSynonymOfTheDay,
};

export type PageDataOptions = {
  battery?: number;
  forceMode?: DayMode;
};

export function parsePageDataOptions(
  query: Record<string, string | string[]> = {}
): PageDataOptions {
  const { battery = "", forceMode = "" } = query;

  return {
    battery: Number.parseInt(battery.toString(), 10) || undefined,
    forceMode: validateDayMode(forceMode.toString()),
  };
}

export type PageData = {
  time: string;
  date: string;
  battery?: number;
  refreshSchedule: RefreshSchedule;
  nextRefreshTime: string;
  nextRefreshSeconds: number;
  calendar: PreparedCalendarData;
  airly: AirlyData | AirlyError;
  dayMode: DayMode;
  synonym: SynonymOfTheDay | SynonymOfTheDayError | false;
};

export function resolveDayMode(
  { forceMode }: PageDataOptions,
  now: Date = getNow()
): DayMode {
  return forceMode || getDayMode(now);
}

export async function getPageData(
  options: PageDataOptions,
  now: Date = getNow(),
  sources: PageDataSources = DEFAULT_SOURCES
): Promise<PageData> {
  const dayMode = resolveDayMode(options, now);

  const [{ calendar, refreshScheduleOverride }, airly, synonym] =
    await Promise.all([
      sources.getCalendarData(),
      sources.getAirlyData(),
      MODES_WITH_SYNONYM.includes(dayMode) && sources.getSynonymOfTheDay(),
    ]);

  const refreshSchedule = getCurrentRefreshSchedule(
    now,
    refreshScheduleOverride
  );
  const nextRefreshTime = getNextRefreshTime(now, refreshSchedule);

  return {
    time: formatTime(now),
    date: formatDate(now),
    battery: options.battery,
    refreshSchedule,
    nextRefreshTime: formatTime(nextRefreshTime),
    nextRefreshSeconds: getSecondsToNextRefresh(now, nextRefreshTime),
    calendar,
    airly,
    dayMode,
    synonym,
  };
}
