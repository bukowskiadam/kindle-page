export const isDevelopment: boolean = process.env.VERCEL_ENV === "development";

export const AIRLY_API_KEY: string = process.env.AIRLY_API_KEY || "";
export const AIRLY_LAT: string = process.env.AIRLY_LAT || "";
export const AIRLY_LNG: string = process.env.AIRLY_LNG || "";
