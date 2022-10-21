import axios from "axios";

import type { AirlyData, AirlyError } from "./types";
import { AUTH_TOKEN } from "./config";
import { getSelfUrl } from "./vercel";

export async function getAirlyData(): Promise<AirlyData | AirlyError> {
  return (await axios.get(`${getSelfUrl()}/api/airly?auth=${AUTH_TOKEN}`)).data;
}
