import axios from "axios";

const calendarMockData = [
  {
    day: "poniedziałek, 26.09",
    allDay: [{ title: "Test event", calendar: "Calendar 1" }],
    time: [],
    noEvents: false,
  },
  { day: "wtorek, 27.09", allDay: [], time: [], noEvents: true },
  { day: "środa, 28.09", allDay: [], time: [], noEvents: true },
  { day: "czwartek, 29.09", allDay: [], time: [], noEvents: true },
  {
    day: "piątek, 30.09",
    allDay: [],
    time: [
      {
        title: "Zrobić prezentację",
        calendar: "Praca",
        start: "08:00",
        end: "09:00",
      },
    ],
    noEvents: false,
  },
];

export async function getCalendarData(
  calendarUrl: string,
  returnMock: boolean = false
) {
  if (returnMock) {
    return calendarMockData;
  }

  if (!calendarUrl) {
    return [];
  }

  return (await axios.get(calendarUrl)).data.map((row) => {
    row.day = new Date(row.day).toLocaleString("pl-PL", {
      timeZone: "Europe/Warsaw",
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });

    row.time.forEach((ev) => {
      ev.start = new Date(ev.start).toLocaleString("pl-PL", {
        timeZone: "Europe/Warsaw",
        hour: "2-digit",
        minute: "2-digit",
      });
      ev.end = new Date(ev.end).toLocaleString("pl-PL", {
        timeZone: "Europe/Warsaw",
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    row.noEvents = !row.allDay.length && !row.time.length;

    return row;
  });
}
