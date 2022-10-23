function getDay(offset: number): string {
  const now = new Date();
  now.setDate(now.getDate() + offset);

  return now.toJSON();
}

const long = [
  {
    day: getDay(-1),
    allDay: [
      { title: "Test event with long title", calendar: "Calendar 1" },
      { title: "Test event with long title pt 2", calendar: "Calendar 2" },
    ],
    time: [],
  },
  {
    day: getDay(0),
    allDay: [],
    time: [
      {
        title: "Fix the dashboard",
        calendar: "Praca",
        start: "2022-10-22T06:00:00.000Z",
        end: "2022-10-22T09:00:00.000Z",
      },
      {
        title: "Fix the dashboard",
        calendar: "Praca",
        start: "2022-10-22T10:00:00.000Z",
        end: "2022-10-22T12:00:00.000Z",
      },
      {
        title: "Prepare slides",
        calendar: "Praca",
        start: "2022-10-22T12:00:00.000Z",
        end: "2022-10-22T14:00:00.000Z",
      },
    ],
  },
  { day: getDay(1), allDay: [], time: [] },
  {
    day: getDay(2),
    allDay: [
      { title: "Test event with long title", calendar: "Calendar 1" },
      { title: "Test event with long title pt 2", calendar: "Calendar 2" },
      { title: "Test event with long title pt 3", calendar: "Calendar 2" },
    ],
    time: [],
  },
  {
    day: getDay(3),
    allDay: [],
    time: [
      {
        title: "Zrobić prezentację",
        calendar: "Praca",
        start: "2022-10-25T05:00:00.000Z",
        end: "2022-10-25T07:00:00.000Z",
      },
    ],
  },
];

const short = [
  {
    day: getDay(-1),
    allDay: [{ title: "Test event", calendar: "Calendar 1" }],
    time: [],
  },
  {
    day: getDay(0),
    allDay: [
      // {
      //   title: "kindlectl wfh",
      //   calendar: "get",
      // },
    ],
    time: [],
  },
  { day: getDay(1), allDay: [], time: [] },
  { day: getDay(2), allDay: [], time: [] },
  {
    day: getDay(3),
    allDay: [],
    time: [
      {
        title: "Zrobić prezentację",
        calendar: "Praca",
        start: "2022-10-25T05:00:00.000Z",
        end: "2022-10-25T07:00:00.000Z",
      },
    ],
  },
];

export const calendarMockData = { long, short };
