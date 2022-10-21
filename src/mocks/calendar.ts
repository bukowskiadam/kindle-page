const long = [
  {
    day: "poniedziałek, 26.09",
    allDay: [
      { title: "Test event with long title", calendar: "Calendar 1" },
      { title: "Test event with long title pt 2", calendar: "Calendar 2" },
    ],
    time: [],
    noEvents: false,
  },
  {
    day: "wtorek, 27.09",
    allDay: [],
    time: [
      {
        title: "Fix the dashboard",
        calendar: "Praca",
        start: "8:00",
        end: "11:00",
      },
      {
        title: "Fix the dashboard",
        calendar: "Praca",
        start: "12:00",
        end: "14:00",
      },
      {
        title: "Prepare slides",
        calendar: "Praca",
        start: "14:00",
        end: "16:00",
      },
    ],
    noEvents: false,
  },
  { day: "środa, 28.09", allDay: [], time: [], noEvents: true },
  {
    day: "czwartek, 29.09",
    allDay: [
      { title: "Test event with long title", calendar: "Calendar 1" },
      { title: "Test event with long title pt 2", calendar: "Calendar 2" },
      { title: "Test event with long title pt 3", calendar: "Calendar 2" },
    ],
    time: [],
    noEvents: false,
  },
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

const short = [
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

export const calendarMockData = { long, short };
