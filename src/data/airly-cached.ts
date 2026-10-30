import axios from "axios";

import type { AirlyData, AirlyError } from "../types.ts";
import { AUTH_TOKEN } from "../config.ts";
import { getSelfUrl } from "../vercel.ts";

export async function getAirlyData(): Promise<AirlyData | AirlyError> {
  return (await axios.get(`${getSelfUrl()}/api/airly?auth=${AUTH_TOKEN}`)).data;
}
