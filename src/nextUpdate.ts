import {
  MIN_THRESHOLD_MS,
  TIME_ZONE,
  UPDATE_TIMES_WEEKDAY,
  UPDATE_TIMES_WEEKEND,
} from "./config";

function changeTimeZone(date: Date, timeZone: string) {
  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}

function mapConfigToTimes(now: Date) {
  const day = now.getDay();
  const configTimes =
    day === 0 || day === 6 ? UPDATE_TIMES_WEEKEND : UPDATE_TIMES_WEEKDAY;

  const times = configTimes.map((str) => {
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

export function getSecondsToNextUpdate(): number {
  const now = changeTimeZone(new Date(), TIME_ZONE);

  const times = mapConfigToTimes(now);

  const nextUpdate = times.find(
    (next) => next.getTime() > now.getTime() + MIN_THRESHOLD_MS
  );

  if (!nextUpdate) {
    console.error(
      "There is something wrong with your schedule. Returning default refresh time of 60 minutes."
    );

    return 60 * 60;
  }

  return (nextUpdate.getTime() - now.getTime()) / 1000;
}
