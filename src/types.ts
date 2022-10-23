export type ImageForKindleOpts = {
  rotate?: boolean;
};

export type ScreenshotResult = {
  screenshot: Buffer;
  headers: Record<string, string>;
};

export enum RefreshSchedule {
  Work = "Work",
  Weekend = "Weekend",
  WFH = "WFH",
  Vacation = "Vacation",
}

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
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: {
    value: number;
    description: string;
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

export type Quote = {
  content: string;
  author: string;
};
