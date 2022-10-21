import axios from "axios";

import { CALENDAR_EVENTS_URL, IS_DEVELOPMENT, TIME_ZONE } from "../src/config";
import { calendarMockData } from "./mocks/calendar";

type CalendarApiDayData = {
  day: Date;
  allDay: Array<{ title: string; calendar: string }>;
  time: Array<{ title: string; calendar: string; start: Date; end: Date }>;
};
type CalendarApiData = Array<CalendarApiDayData>;

export async function getCalendarData() {
  if (IS_DEVELOPMENT) {
    return calendarMockData.short;
  }

  if (!CALENDAR_EVENTS_URL) {
    return [];
  }

  return (await axios.get<CalendarApiData>(CALENDAR_EVENTS_URL)).data.map(
    (row) => ({
      ...row,

      day: new Date(row.day).toLocaleString("pl-PL", {
        timeZone: TIME_ZONE,
        weekday: "long",
        month: "numeric",
        day: "numeric",
      }),

      time: row.time.forEach((ev) => ({
        ...ev,
        start: new Date(ev.start).toLocaleString("pl-PL", {
          timeZone: TIME_ZONE,
          hour: "2-digit",
          minute: "2-digit",
        }),
        end: new Date(ev.end).toLocaleString("pl-PL", {
          timeZone: TIME_ZONE,
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),

      noEvents: !row.allDay.length && !row.time.length,
    })
  );
}
