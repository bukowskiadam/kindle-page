import axios from "axios";

import { CALENDAR_EVENTS_URL, IS_DEVELOPMENT } from "../src/config";
import { formatDate, formatTime } from "./date";
import { calendarMockData } from "./mocks/calendar";
import {
  CalendarApiData,
  CalendarDataWithRefreshSchedule,
  RefreshSchedule,
} from "./types";

export async function getCalendarData(): Promise<CalendarDataWithRefreshSchedule> {
  if (IS_DEVELOPMENT) {
    return {
      calendar: calendarMockData.short,
    };
  }

  if (!CALENDAR_EVENTS_URL) {
    return {
      calendar: [],
    };
  }

  const calendar = (
    await axios.get<CalendarApiData>(CALENDAR_EVENTS_URL)
  ).data.map((row) => ({
    ...row,

    day: formatDate(row.day),

    time: row.time.map((ev) => ({
      ...ev,
      start: formatTime(ev.start),
      end: formatTime(ev.end),
    })),

    noEvents: !row.allDay.length && !row.time.length,
  }));

  return {
    calendar,
    refreshScheduleOverride: RefreshSchedule.Vacation,
  };
}
