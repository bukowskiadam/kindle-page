export const IS_DEVELOPMENT: boolean = process.env.VERCEL_ENV === "development";

export const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export const AIRLY_API_KEY: string = process.env.AIRLY_API_KEY || "";
export const AIRLY_LAT: string = process.env.AIRLY_LAT || "";
export const AIRLY_LNG: string = process.env.AIRLY_LNG || "";

export const CALENDAR_EVENTS_URL: string = process.env.CALENDAR_EVENTS || "";

export const SELF_URL: string = process.env.VERCEL_URL || "";

export const TIME_ZONE = "Europe/Warsaw";

export const MIN_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes
export const UPDATE_TIMES = [
  "00:00",
  "02:00",
  "04:00",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:30",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
