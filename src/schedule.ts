import { MIN_THRESHOLD_MS, REFRESH_SCHEDULE } from "./config";
import { changeTimeZone } from "./date";
import { RefreshSchedule } from "./types";

export function getCurrentRefreshSchedule(
  now: Date,
  override?: RefreshSchedule
): RefreshSchedule {
  if (override) {
    return override;
  }

  const day = now.getDay();

  if (day === 0 || day === 6) {
    return RefreshSchedule.Weekend;
  }

  return RefreshSchedule.Work;
}

function selectSchedule(now: Date, schedule: RefreshSchedule) {
  const localNow = changeTimeZone(now);
  const configTimes = REFRESH_SCHEDULE[schedule];

  const times = configTimes.map((str) => {
    const [hours, minutes] = str.split(":");
    const next = new Date(localNow);

    next.setHours(Number.parseInt(hours, 10));
    next.setMinutes(Number.parseInt(minutes, 10));
    next.setSeconds(0);
    next.setMilliseconds(0);

    return next;
  });
  const nextDay = new Date(times[0]);
  nextDay.setDate(nextDay.getDate() + 1);
  times.push(nextDay);

  return times;
}

export function getNextRefreshTime(now: Date, schedule: RefreshSchedule) {
  const times = selectSchedule(now, schedule);

  const nextRefresh = times.find(
    (next) => next.getTime() > now.getTime() + MIN_THRESHOLD_MS
  );

  if (!nextRefresh) {
    throw new Error("Couldn't find next refresh time");
  }

  return nextRefresh;
}

export function getSecondsToNextRefresh(now: Date, next: Date): number {
  return Math.floor((next.getTime() - now.getTime()) / 1000);
}
