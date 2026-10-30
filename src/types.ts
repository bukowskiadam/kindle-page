export type ImageForKindleOpts = {
  rotate?: boolean;
};

export const RefreshSchedule = {
  Work: "Work",
  Weekend: "Weekend",
  WFH: "WFH",
  Vacation: "Vacation",
} as const;

export type RefreshSchedule =
  (typeof RefreshSchedule)[keyof typeof RefreshSchedule];

export type DayMode = "morning" | "day" | "evening" | "night";

export type AllDayEvent = { title: string; calendar: string };
export type TimeEvent<T> = {
  title: string;
  calendar: string;
  start: T;
  end: T;
};

export type CalendarApiDayData<T> = {
  day: T;
  allDay: AllDayEvent[];
  time: TimeEvent<T>[];
};

export type SerializedDate = string;
export type CalendarApiData = Array<CalendarApiDayData<SerializedDate>>;

export type PreparedCalendarData = Array<
  CalendarApiDayData<string> & { noEvents: boolean }
>;

export type CalendarDataWithRefreshSchedule = {
  calendar: PreparedCalendarData;
  refreshScheduleOverride?: RefreshSchedule;
};

export type AirlyData = {
  type: "data";
  /** formatted for display, e.g. "9.3" or "12" */
  temperature: string;
  humidity: number;
  pressure: number;
  airQuality: {
    label: string;
    value: number;
  };
  pm25: {
    value: number;
    limit: number;
    percent: number;
  };
  pm10: {
    value: number;
    limit: number;
    percent: number;
  };
};

export type AirlyError = {
  type: "error";
  error: string;
};

export type EnglishPhrase = {
  phrase: string;
  meaning: string;
  example: string;
  polish: string;
};

export type DailyPhrase = EnglishPhrase & {
  /** e.g. "phrasal verb", "idiom" */
  category: string;
};

export type DailyEnglish = {
  title: string;
  phrases: DailyPhrase[];
};

export type GospelData = {
  type: "data";
  /** e.g. "Ewangelia wg św. Łukasza 14,1-6" */
  reference: string;
  text: string;
};

export type GospelError = {
  type: "error";
  error: string;
};

/** The daily text shown next to the calendar; which one depends on the day mode. */
export type DailyText =
  | { kind: "dailyEnglish"; dailyEnglish: DailyEnglish }
  | { kind: "gospel"; gospel: GospelData | GospelError };
