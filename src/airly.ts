import axios from "axios";
import {
  AIRLY_API_KEY,
  AIRLY_INDEX,
  AIRLY_INDEX_LABEL,
  AIRLY_LAT,
  AIRLY_LNG,
  IS_DEVELOPMENT,
} from "./config";
import { storedAirlyData } from "./mocks/airly";
import type { AirlyData, AirlyError } from "./types";

export async function getAirlyData(): Promise<AirlyData | AirlyError> {
  if (!AIRLY_API_KEY || !AIRLY_LAT || !AIRLY_LNG) {
    return {
      type: "error",
      error: "missing configuration",
    };
  }

  let data = storedAirlyData;

  if (!IS_DEVELOPMENT) {
    try {
      const response = await axios.get(
        `https://airapi.airly.eu/v2/measurements/point?lat=${AIRLY_LAT}&lng=${AIRLY_LNG}&indexType=${AIRLY_INDEX}`,
        {
          headers: {
            "accept-language": "pl-PL",
            apikey: AIRLY_API_KEY,
          },
        }
      );

      data = response.data;
    } catch (error) {
      return {
        type: "error",
        error:
          "Something went wrong when fetching airly: " +
          (error.response ? error.response.statusText : " unknown problem"),
      };
    }
  }

  return mapAirlyData(data.current);
}

function mapAirlyData(current: any): AirlyData {
  const values = Object.fromEntries(
    current.values.map(({ name, value }) => [name, value])
  );

  const caqi = current.indexes[0];
  const airQuality = {
    label: AIRLY_INDEX_LABEL,
    value: caqi.value,
    description: caqi.description,
  };

  const standards = Object.fromEntries(
    current.standards.map(({ pollutant, limit, percent }) => [
      pollutant,
      {
        value: values[pollutant],
        limit,
        percent,
      },
    ])
  );

  return {
    type: "data",
    temperature:
      Math.abs(values.TEMPERATURE) < 10
        ? values.TEMPERATURE.toFixed(1)
        : values.TEMPERATURE.toFixed(0),
    humidity: values.HUMIDITY,
    pressure: values.PRESSURE,
    airQuality,
    pm10: standards.PM10,
    pm25: standards.PM25,
  };
}
