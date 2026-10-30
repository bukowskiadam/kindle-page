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
  Quote,
  RefreshSchedule,
  SynonymOfTheDay,
  SynonymOfTheDayError,
} from "./types.js";

const MODES_WITH_SYNONYM: DayMode[] = ["day", "morning", "evening"];

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
  quote: Quote | null;
  airly: AirlyData | AirlyError;
  dayMode: DayMode;
  synonym: SynonymOfTheDay | SynonymOfTheDayError | false;
};

export async function getPageData({
  battery,
  forceMode,
}: PageDataOptions): Promise<PageData> {
  const now = getNow();
  const dayMode = forceMode || getDayMode(now);

  const [{ calendar, refreshScheduleOverride }, quote, airly, synonym] =
    await Promise.all([
      getCalendarData(),
      null, // dayMode === "day" && getRandomQuote(), // disabled for now
      getAirlyData(),
      MODES_WITH_SYNONYM.includes(dayMode) && getSynonymOfTheDay(),
    ]);

  const refreshSchedule = getCurrentRefreshSchedule(
    now,
    refreshScheduleOverride
  );
  const nextRefreshTime = getNextRefreshTime(now, refreshSchedule);

  return {
    time: formatTime(now),
    date: formatDate(now),
    battery,
    refreshSchedule,
    nextRefreshTime: formatTime(nextRefreshTime),
    nextRefreshSeconds: getSecondsToNextRefresh(now, nextRefreshTime),
    calendar,
    quote,
    airly,
    dayMode,
    synonym,
  };
}
