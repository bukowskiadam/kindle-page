export type ImageForKindleOpts = {
  rotate?: boolean;
};

export type ScreenshotResult = {
  screenshot: Buffer;
  headers: Record<string, string>;
};

export type CalendarApiDayData<T> = {
  day: T;
  allDay: Array<{ title: string; calendar: string }>;
  time: Array<{ title: string; calendar: string; start: T; end: T }>;
};

export type CalendarApiData = Array<CalendarApiDayData<Date>>;

export type PreparedCalendarData = Array<
  CalendarApiDayData<string> & { noEvents: boolean }
>;

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
