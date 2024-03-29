import { TIME_ZONE } from "./config.js";
import type { SerializedDate } from "./types.js";

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

export function formatDate(date: Date | SerializedDate): string {
  return dateObj(date).toLocaleString("pl-PL", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
}
