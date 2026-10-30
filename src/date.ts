import { TIME_ZONE } from "./config.ts";
import type { SerializedDate } from "./types.ts";

export function changeTimeZone(date: Date) {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone: TIME_ZONE,
    })
  );
}

export function getNow(): Date {
  return new Date();
}

export function isToday(day: SerializedDate): boolean {
  return formatDate(day) === formatDate(getNow());
}

function dateObj(date: Date | SerializedDate): Date {
  return date instanceof Date ? date : new Date(date);
}

export function formatTime(date: Date | SerializedDate): string {
  return dateObj(date).toLocaleString("pl-PL", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Local calendar day as YYYYMMDD, e.g. "20261030". */
export function formatCompactDay(date: Date): string {
  // the en-CA locale formats dates as YYYY-MM-DD
  const isoDay = date.toLocaleDateString("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return isoDay.replaceAll("-", "");
}

export function formatDate(date: Date | SerializedDate): string {
  return dateObj(date).toLocaleString("pl-PL", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
}
