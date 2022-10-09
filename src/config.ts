export const IS_DEVELOPMENT: boolean = process.env.VERCEL_ENV === "development";

export const AUTH_TOKEN: string = process.env.AUTH_TOKEN || "";

export const AIRLY_API_KEY: string = process.env.AIRLY_API_KEY || "";
export const AIRLY_LAT: string = process.env.AIRLY_LAT || "";
export const AIRLY_LNG: string = process.env.AIRLY_LNG || "";

export const CALENDAR_EVENTS_URL: string = process.env.CALENDAR_EVENTS || "";

export const SELF_URL: string = process.env.VERCEL_URL || "";
