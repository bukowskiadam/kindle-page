import { RefreshSchedule } from "./types";

export const IS_DEVELOPMENT: boolean = process.env.VERCEL_ENV === "development";

export const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export const AIRLY_API_KEY: string = process.env.AIRLY_API_KEY || "";
export const AIRLY_LAT: string = process.env.AIRLY_LAT || "";
export const AIRLY_LNG: string = process.env.AIRLY_LNG || "";

export const CALENDAR_EVENTS_URL: string = process.env.CALENDAR_EVENTS || "";

export const SELF_URL: string = process.env.VERCEL_URL || "";

export const TIME_ZONE = "Europe/Warsaw";

export const KINDLECTL_KEYWORD = "kindlectl";

export const MIN_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes
export const REFRESH_SCHEDULE: { [key in RefreshSchedule]: string[] } = {
  [RefreshSchedule.Work]: [
    "00:00",
    "06:00",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:30",
    "09:00",
    "12:00",
    "14:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  [RefreshSchedule.Weekend]: [
    "00:00",
    "06:00",
    "07:00",
    "07:30",
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
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  [RefreshSchedule.WFH]: [
    "00:00",
    "06:00",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  [RefreshSchedule.Vacation]: ["00:01"],
};
