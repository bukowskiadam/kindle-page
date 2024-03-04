import axios from "axios";

import {
  CALENDAR_EVENTS_URL,
  IS_DEVELOPMENT,
  KINDLECTL_KEYWORD,
} from "../src/config.js";
import { formatDate, formatTime, isToday } from "./date.js";
import { calendarMockData } from "./mocks/calendar.js";
import {
  CalendarApiData,
  CalendarDataWithRefreshSchedule,
  AllDayEvent,
  RefreshSchedule,
} from "./types.js";

function isKindleCtlCommand(event: AllDayEvent): boolean {
  return event.title.trim().toLowerCase().startsWith(KINDLECTL_KEYWORD);
}

function getKindleCtlCommand(events: AllDayEvent[] = []): string | undefined {
  const event = events.find((event) => isKindleCtlCommand(event));

  if (!event) {
    return undefined;
  }

  const command = event.title
    .toLowerCase()
    .replace(KINDLECTL_KEYWORD, "")
    .trim();

  return command;
}

function filterOutKindleCtlCommands(events: AllDayEvent[]): AllDayEvent[] {
  return events.filter((event) => !isKindleCtlCommand(event));
}

function getRefreshScheduleOverride(
  command: string | undefined
): RefreshSchedule | undefined {
  switch (command) {
    case "wfh":
      return RefreshSchedule.WFH;
    case "vacation":
      return RefreshSchedule.Vacation;
    case "weekend":
      return RefreshSchedule.Weekend;
    case "work":
      return RefreshSchedule.Work;
  }

  return undefined;
}

async function getApiData(): Promise<CalendarApiData> {
  if (IS_DEVELOPMENT) {
    return calendarMockData.short;
  }

  return (await axios.get<CalendarApiData>(CALENDAR_EVENTS_URL)).data;
}

export async function getCalendarData(): Promise<CalendarDataWithRefreshSchedule> {
  const calendarApiData = await getApiData();

  const today = calendarApiData.find(({ day }) => isToday(day));
  const kindleCtlCommand = getKindleCtlCommand(today?.allDay);

  const calendar = calendarApiData.map((row) => {
    const allDay = filterOutKindleCtlCommands(row.allDay);
    const time = row.time.map((ev) => ({
      ...ev,
      start: formatTime(ev.start),
      end: formatTime(ev.end),
    }));

    return {
      day: formatDate(row.day),
      allDay,
      time,
      noEvents: !allDay.length && !time.length,
    };
  });

  return {
    calendar,
    refreshScheduleOverride: getRefreshScheduleOverride(kindleCtlCommand),
  };
}
