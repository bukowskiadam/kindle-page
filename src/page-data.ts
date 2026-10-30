import { getCachedAirlyData } from "./data/airly-cached.ts";
import { getCalendarData } from "./data/calendar.ts";
import { getDailyEnglish } from "./data/daily-english.ts";
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
  DailyEnglish,
} from "./types.ts";

const MODES_WITH_DAILY_ENGLISH: DayMode[] = ["day", "morning", "evening"];

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
  dailyEnglish: DailyEnglish | false;
};

export function resolveDayMode(
  { forceMode }: PageDataOptions,
  now: Date = getNow()
): DayMode {
  return forceMode || getDayMode(now);
}

export async function getPageData(
  options: PageDataOptions,
  now: Date = getNow()
): Promise<PageData> {
  const dayMode = resolveDayMode(options, now);

  const [{ calendar, refreshScheduleOverride }, airly] = await Promise.all([
    getCalendarData(),
    getCachedAirlyData(),
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
    dailyEnglish:
      MODES_WITH_DAILY_ENGLISH.includes(dayMode) && getDailyEnglish(now),
  };
}
