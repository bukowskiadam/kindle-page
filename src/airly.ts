import axios from "axios";
import { AIRLY_API_KEY, AIRLY_LAT, AIRLY_LNG, isDevelopment } from "./config";
import { storedAirlyData } from "./fixtures/airly";

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

type AirlyError = {
  type: "error";
  error: string;
};

export async function getAirlyData(): Promise<AirlyData | AirlyError> {
  if (!AIRLY_API_KEY || !AIRLY_LAT || !AIRLY_LNG) {
    return {
      type: "error",
      error: "missing configuration",
    };
  }

  let data = storedAirlyData;

  if (!isDevelopment) {
    try {
      const response = await axios.get(
        `https://airapi.airly.eu/v2/measurements/point?lat=${AIRLY_LAT}&lng=${AIRLY_LNG}`,
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
          "Something went wrong when fething airly: " +
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
    value: caqi.value as number,
    description: caqi.description as string,
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
    temperature: values.TEMPERATURE,
    humidity: values.HUMIDITY,
    pressure: values.PRESSURE,
    airQuality,
    pm10: standards.PM10,
    pm25: standards.PM25,
  };
}
