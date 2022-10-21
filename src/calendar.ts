import axios from "axios";

import { CALENDAR_EVENTS_URL, IS_DEVELOPMENT, TIME_ZONE } from "../src/config";
import { calendarMockData } from "./mocks/calendar";

export async function getCalendarData() {
  if (IS_DEVELOPMENT) {
    return calendarMockData.short;
  }

  if (!CALENDAR_EVENTS_URL) {
    return [];
  }

  return (await axios.get(CALENDAR_EVENTS_URL)).data.map((row) => {
    row.day = new Date(row.day).toLocaleString("pl-PL", {
      timeZone: TIME_ZONE,
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });

    row.time.forEach((ev) => {
      ev.start = new Date(ev.start).toLocaleString("pl-PL", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
      });
      ev.end = new Date(ev.end).toLocaleString("pl-PL", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    row.noEvents = !row.allDay.length && !row.time.length;

    return row;
  });
}
