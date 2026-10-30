import { getCachedAirlyData } from "./data/airly-cached.ts";
import { getCalendarData } from "./data/calendar.ts";
import { getDailyEnglish } from "./data/daily-english.ts";
import { getGospelOfTheDay } from "./data/evangelizo.ts";
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
  DailyText,
  DayMode,
  PreparedCalendarData,
  RefreshSchedule,
} from "./types.ts";

type DailyTextLoader = (now: Date) => Promise<DailyText>;

const loadDailyEnglish: DailyTextLoader = async (now) => ({
  kind: "dailyEnglish",
  dailyEnglish: getDailyEnglish(now),
});

const loadGospel: DailyTextLoader = async (now) => ({
  kind: "gospel",
  gospel: await getGospelOfTheDay(now),
});

/** Day modes without a loader show no daily text. */
const DAILY_TEXT_LOADERS: Partial<Record<DayMode, DailyTextLoader>> = {
  morning: loadGospel,
  day: loadDailyEnglish,
  evening: loadDailyEnglish,
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
  dailyText?: DailyText;
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

  const [{ calendar, refreshScheduleOverride }, airly, dailyText] =
    await Promise.all([
      getCalendarData(),
      getCachedAirlyData(),
      DAILY_TEXT_LOADERS[dayMode]?.(now),
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
    dailyText,
  };
}
