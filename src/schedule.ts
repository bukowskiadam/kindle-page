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

function mapScheduleConfigToDates(scheduleConfig: string[], now: Date) {
  const times = scheduleConfig.map((str) => {
    const [hours, minutes] = str.split(":");
    const next = new Date(now);

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
  const scheduleConfig = REFRESH_SCHEDULE[schedule];

  const localNow = changeTimeZone(now);
  const localTimes = mapScheduleConfigToDates(scheduleConfig, localNow);

  const nextRefreshLocal = localTimes.find(
    (next) => next.getTime() > localNow.getTime() + MIN_THRESHOLD_MS
  );

  if (!nextRefreshLocal) {
    throw new Error("Cannot find next refresh time");
  }

  const offset = nextRefreshLocal.getTime() - localNow.getTime();

  const nextRefresh = new Date(now);
  nextRefresh.setTime(nextRefresh.getTime() + offset);

  return nextRefresh;
}

export function getSecondsToNextRefresh(now: Date, next: Date): number {
  return Math.floor((next.getTime() - now.getTime()) / 1000);
}
