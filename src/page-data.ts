import { getAirlyData } from "./data/airly-cached.ts";
import { getCalendarData } from "./data/calendar.ts";
import { getWordOfTheDay } from "./data/dictionary-com.ts";
import { formatDate, formatTime, getNow } from "./date.ts";
import {
  getCurrentRefreshSchedule,
  getDayMode,
  getNextRefreshTime,
  getSecondsToNextRefresh,
  validateDayMode,
} from "./schedule.ts";
import type {
  AirlyData,
  AirlyError,
  DayMode,
  PreparedCalendarData,
  RefreshSchedule,
  WordOfTheDayData,
  WordOfTheDayError,
} from "./types.ts";

const MODES_WITH_WORD_OF_THE_DAY: DayMode[] = ["day", "morning", "evening"];

export type PageDataSources = {
  getCalendarData: typeof getCalendarData;
  getAirlyData: () => Promise<AirlyData | AirlyError>;
  getWordOfTheDay: typeof getWordOfTheDay;
};

const DEFAULT_SOURCES: PageDataSources = {
  getCalendarData,
  getAirlyData,
  getWordOfTheDay,
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
  wordOfTheDay: WordOfTheDayData | WordOfTheDayError | false;
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

  const [{ calendar, refreshScheduleOverride }, airly, wordOfTheDay] =
    await Promise.all([
      sources.getCalendarData(),
      sources.getAirlyData(),
      MODES_WITH_WORD_OF_THE_DAY.includes(dayMode) && sources.getWordOfTheDay(),
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
    wordOfTheDay,
  };
}
