import axios from "axios";

import type { AirlyData, AirlyError } from "../types.js";
import { AUTH_TOKEN } from "../config.js";
import { getSelfUrl } from "../vercel.js";

export async function getAirlyData(): Promise<AirlyData | AirlyError> {
  return (await axios.get(`${getSelfUrl()}/api/airly?auth=${AUTH_TOKEN}`)).data;
}
