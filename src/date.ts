import { TIME_ZONE } from "./config";
import { SerializedDate } from "./types";

function changeTimeZone(date: Date, timeZone: string) {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}

export function getNow(): Date {
  return changeTimeZone(new Date(), TIME_ZONE);
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
