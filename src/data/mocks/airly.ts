export const storedAirlyData = {
  current: {
    fromDateTime: "2022-10-30T05:55:33.479Z",
    tillDateTime: "2022-10-30T06:55:33.479Z",
    values: [
      {
        name: "PM1",
        value: 15.83,
      },
      {
        name: "PM25",
        value: 25.56,
      },
      {
        name: "PM10",
        value: 37.71,
      },
      {
        name: "PRESSURE",
        value: 1021.62,
      },
      {
        name: "HUMIDITY",
        value: 91.77,
      },
      {
        name: "TEMPERATURE",
        value: 8.92,
      },
    ],
    indexes: [
      {
        name: "AIRLY_AQI",
        value: 170.39,
        level: "MEDIUM",
        description:
          "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
        advice:
          "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
        color: "#F0BA0F",
      },
    ],
    standards: [
      {
        name: "WHO",
        pollutant: "PM25",
        limit: 15,
        percent: 170.39,
        averaging: "24h",
      },
      {
        name: "WHO",
        pollutant: "PM10",
        limit: 45,
        percent: 83.8,
        averaging: "24h",
      },
    ],
  },
  history: [
    {
      fromDateTime: "2022-10-29T06:00:00.000Z",
      tillDateTime: "2022-10-29T07:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 12.2,
        },
        {
          name: "PM25",
          value: 19.49,
        },
        {
          name: "PM10",
          value: 27.11,
        },
        {
          name: "PRESSURE",
          value: 1023.09,
        },
        {
          name: "HUMIDITY",
          value: 92.34,
        },
        {
          name: "TEMPERATURE",
          value: 7.97,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 129.92,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 129.92,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 60.25,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T07:00:00.000Z",
      tillDateTime: "2022-10-29T08:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 10.91,
        },
        {
          name: "PM25",
          value: 17.42,
        },
        {
          name: "PM10",
          value: 23.3,
        },
        {
          name: "PRESSURE",
          value: 1023.47,
        },
        {
          name: "HUMIDITY",
          value: 83.82,
        },
        {
          name: "TEMPERATURE",
          value: 9.76,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 116.13,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 116.13,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 51.78,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T08:00:00.000Z",
      tillDateTime: "2022-10-29T09:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 7.62,
        },
        {
          name: "PM25",
          value: 11.86,
        },
        {
          name: "PM10",
          value: 15.43,
        },
        {
          name: "PRESSURE",
          value: 1023.64,
        },
        {
          name: "HUMIDITY",
          value: 75.69,
        },
        {
          name: "TEMPERATURE",
          value: 12.28,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 79.05,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#E4E11C",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 79.05,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 34.29,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T09:00:00.000Z",
      tillDateTime: "2022-10-29T10:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 5.14,
        },
        {
          name: "PM25",
          value: 8.09,
        },
        {
          name: "PM10",
          value: 10.37,
        },
        {
          name: "PRESSURE",
          value: 1023.24,
        },
        {
          name: "HUMIDITY",
          value: 67.54,
        },
        {
          name: "TEMPERATURE",
          value: 14.58,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 53.95,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 53.96,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 23.05,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T10:00:00.000Z",
      tillDateTime: "2022-10-29T11:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 4.59,
        },
        {
          name: "PM25",
          value: 7.35,
        },
        {
          name: "PM10",
          value: 9.63,
        },
        {
          name: "PRESSURE",
          value: 1022.94,
        },
        {
          name: "HUMIDITY",
          value: 61.23,
        },
        {
          name: "TEMPERATURE",
          value: 15.3,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 49,
          level: "VERY_LOW",
          description: "Fantastyczne powietrze. Żyj aktywnie!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#4EAD25",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 49.01,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 21.41,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T11:00:00.000Z",
      tillDateTime: "2022-10-29T12:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 4.61,
        },
        {
          name: "PM25",
          value: 7,
        },
        {
          name: "PM10",
          value: 8.85,
        },
        {
          name: "PRESSURE",
          value: 1022.4,
        },
        {
          name: "HUMIDITY",
          value: 58.7,
        },
        {
          name: "TEMPERATURE",
          value: 16.03,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 46.69,
          level: "VERY_LOW",
          description: "Fantastyczne powietrze. Żyj aktywnie!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#4EAD25",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 46.7,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 19.66,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T12:00:00.000Z",
      tillDateTime: "2022-10-29T13:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 4.71,
        },
        {
          name: "PM25",
          value: 7.99,
        },
        {
          name: "PM10",
          value: 10.07,
        },
        {
          name: "PRESSURE",
          value: 1022.06,
        },
        {
          name: "HUMIDITY",
          value: 64.86,
        },
        {
          name: "TEMPERATURE",
          value: 16.63,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 53.28,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 53.29,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 22.38,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T13:00:00.000Z",
      tillDateTime: "2022-10-29T14:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 4.98,
        },
        {
          name: "PM25",
          value: 7.7,
        },
        {
          name: "PM10",
          value: 10.24,
        },
        {
          name: "PRESSURE",
          value: 1021.77,
        },
        {
          name: "HUMIDITY",
          value: 68.29,
        },
        {
          name: "TEMPERATURE",
          value: 16.55,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 51.36,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 51.36,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 22.75,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T14:00:00.000Z",
      tillDateTime: "2022-10-29T15:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 5.82,
        },
        {
          name: "PM25",
          value: 8.84,
        },
        {
          name: "PM10",
          value: 11.68,
        },
        {
          name: "PRESSURE",
          value: 1021.64,
        },
        {
          name: "HUMIDITY",
          value: 56.82,
        },
        {
          name: "TEMPERATURE",
          value: 16.06,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 58.9,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 58.9,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 25.95,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T15:00:00.000Z",
      tillDateTime: "2022-10-29T16:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 6.55,
        },
        {
          name: "PM25",
          value: 10.49,
        },
        {
          name: "PM10",
          value: 13.13,
        },
        {
          name: "PRESSURE",
          value: 1021.93,
        },
        {
          name: "HUMIDITY",
          value: 68.56,
        },
        {
          name: "TEMPERATURE",
          value: 14.89,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 69.95,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 69.96,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 29.18,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T16:00:00.000Z",
      tillDateTime: "2022-10-29T17:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 9.48,
        },
        {
          name: "PM25",
          value: 15.1,
        },
        {
          name: "PM10",
          value: 19.91,
        },
        {
          name: "PRESSURE",
          value: 1022.03,
        },
        {
          name: "HUMIDITY",
          value: 79.48,
        },
        {
          name: "TEMPERATURE",
          value: 13.98,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 100.65,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 100.66,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 44.24,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T17:00:00.000Z",
      tillDateTime: "2022-10-29T18:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 11.97,
        },
        {
          name: "PM25",
          value: 18.87,
        },
        {
          name: "PM10",
          value: 26.19,
        },
        {
          name: "PRESSURE",
          value: 1022.14,
        },
        {
          name: "HUMIDITY",
          value: 74.71,
        },
        {
          name: "TEMPERATURE",
          value: 13.02,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 125.8,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 125.81,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 58.2,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T18:00:00.000Z",
      tillDateTime: "2022-10-29T19:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 13.53,
        },
        {
          name: "PM25",
          value: 21.7,
        },
        {
          name: "PM10",
          value: 31.24,
        },
        {
          name: "PRESSURE",
          value: 1022.26,
        },
        {
          name: "HUMIDITY",
          value: 77.2,
        },
        {
          name: "TEMPERATURE",
          value: 12.3,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 144.68,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 144.69,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 69.41,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T19:00:00.000Z",
      tillDateTime: "2022-10-29T20:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 15.26,
        },
        {
          name: "PM25",
          value: 24.49,
        },
        {
          name: "PM10",
          value: 36.12,
        },
        {
          name: "PRESSURE",
          value: 1022.43,
        },
        {
          name: "HUMIDITY",
          value: 76.97,
        },
        {
          name: "TEMPERATURE",
          value: 11.52,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 163.26,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 163.26,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 80.27,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T20:00:00.000Z",
      tillDateTime: "2022-10-29T21:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 15.81,
        },
        {
          name: "PM25",
          value: 25.41,
        },
        {
          name: "PM10",
          value: 37.54,
        },
        {
          name: "PRESSURE",
          value: 1022.54,
        },
        {
          name: "HUMIDITY",
          value: 77.88,
        },
        {
          name: "TEMPERATURE",
          value: 10.98,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 169.38,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 169.38,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 83.42,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T21:00:00.000Z",
      tillDateTime: "2022-10-29T22:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 15.64,
        },
        {
          name: "PM25",
          value: 24.97,
        },
        {
          name: "PM10",
          value: 36.91,
        },
        {
          name: "PRESSURE",
          value: 1022.46,
        },
        {
          name: "HUMIDITY",
          value: 74.84,
        },
        {
          name: "TEMPERATURE",
          value: 10.88,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 166.47,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 166.48,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 82.02,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T22:00:00.000Z",
      tillDateTime: "2022-10-29T23:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 15.79,
        },
        {
          name: "PM25",
          value: 25.02,
        },
        {
          name: "PM10",
          value: 36.95,
        },
        {
          name: "PRESSURE",
          value: 1021.95,
        },
        {
          name: "HUMIDITY",
          value: 72.43,
        },
        {
          name: "TEMPERATURE",
          value: 10.74,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 166.79,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 166.8,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 82.12,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-29T23:00:00.000Z",
      tillDateTime: "2022-10-30T00:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 15.77,
        },
        {
          name: "PM25",
          value: 25.16,
        },
        {
          name: "PM10",
          value: 37.26,
        },
        {
          name: "PRESSURE",
          value: 1021.82,
        },
        {
          name: "HUMIDITY",
          value: 80.36,
        },
        {
          name: "TEMPERATURE",
          value: 10.5,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 167.72,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 167.72,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 82.81,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T00:00:00.000Z",
      tillDateTime: "2022-10-30T01:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 16.38,
        },
        {
          name: "PM25",
          value: 26.3,
        },
        {
          name: "PM10",
          value: 38.84,
        },
        {
          name: "PRESSURE",
          value: 1021.83,
        },
        {
          name: "HUMIDITY",
          value: 85.82,
        },
        {
          name: "TEMPERATURE",
          value: 10.25,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 175.31,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 175.32,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 86.3,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T01:00:00.000Z",
      tillDateTime: "2022-10-30T02:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 16.73,
        },
        {
          name: "PM25",
          value: 26.94,
        },
        {
          name: "PM10",
          value: 40.16,
        },
        {
          name: "PRESSURE",
          value: 1021.63,
        },
        {
          name: "HUMIDITY",
          value: 86.99,
        },
        {
          name: "TEMPERATURE",
          value: 10.11,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 179.61,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 179.62,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 89.24,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T02:00:00.000Z",
      tillDateTime: "2022-10-30T03:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 17.26,
        },
        {
          name: "PM25",
          value: 27.87,
        },
        {
          name: "PM10",
          value: 41.02,
        },
        {
          name: "PRESSURE",
          value: 1021.56,
        },
        {
          name: "HUMIDITY",
          value: 88.31,
        },
        {
          name: "TEMPERATURE",
          value: 9.13,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 185.77,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 185.77,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 91.16,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T03:00:00.000Z",
      tillDateTime: "2022-10-30T04:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 18.06,
        },
        {
          name: "PM25",
          value: 30.58,
        },
        {
          name: "PM10",
          value: 43.63,
        },
        {
          name: "PRESSURE",
          value: 1021.44,
        },
        {
          name: "HUMIDITY",
          value: 89.46,
        },
        {
          name: "TEMPERATURE",
          value: 8.73,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 203.84,
          level: "HIGH",
          description:
            "Powietrze jest zanieczyszczone, ma negatywny wpływ na Twoje zdrowie!",
          advice:
            "Wszyscy mogą odczuwać negatywne skutki zdrowotne, takie jak pogorszenie zdolności poznawczych czy problemy z oddychaniem.",
          color: "#FF761A",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 203.84,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 96.94,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T04:00:00.000Z",
      tillDateTime: "2022-10-30T05:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 17.84,
        },
        {
          name: "PM25",
          value: 29.81,
        },
        {
          name: "PM10",
          value: 42.79,
        },
        {
          name: "PRESSURE",
          value: 1021.38,
        },
        {
          name: "HUMIDITY",
          value: 91.06,
        },
        {
          name: "TEMPERATURE",
          value: 8.28,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 198.71,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 198.71,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 95.09,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T05:00:00.000Z",
      tillDateTime: "2022-10-30T06:00:00.000Z",
      values: [
        {
          name: "PM1",
          value: 16.72,
        },
        {
          name: "PM25",
          value: 27.14,
        },
        {
          name: "PM10",
          value: 40.16,
        },
        {
          name: "PRESSURE",
          value: 1021.47,
        },
        {
          name: "HUMIDITY",
          value: 90.92,
        },
        {
          name: "TEMPERATURE",
          value: 8.54,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 180.96,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 180.96,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 89.24,
          averaging: "24h",
        },
      ],
    },
  ],
  forecast: [
    {
      fromDateTime: "2022-10-30T06:00:00.000Z",
      tillDateTime: "2022-10-30T07:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 25.4,
        },
        {
          name: "PM10",
          value: 37.43,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 169.35,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 169.35,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 83.18,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T07:00:00.000Z",
      tillDateTime: "2022-10-30T08:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 22.15,
        },
        {
          name: "PM10",
          value: 32.46,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 147.64,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 147.65,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 72.14,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T08:00:00.000Z",
      tillDateTime: "2022-10-30T09:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 18.22,
        },
        {
          name: "PM10",
          value: 26.88,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 121.45,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 121.46,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 59.74,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T09:00:00.000Z",
      tillDateTime: "2022-10-30T10:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 14.58,
        },
        {
          name: "PM10",
          value: 22.73,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 97.18,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#E4E11C",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 97.18,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 50.5,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T10:00:00.000Z",
      tillDateTime: "2022-10-30T11:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 12.39,
        },
        {
          name: "PM10",
          value: 21.76,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 82.61,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#E4E11C",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 82.61,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 48.36,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T11:00:00.000Z",
      tillDateTime: "2022-10-30T12:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 10.52,
        },
        {
          name: "PM10",
          value: 22.59,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 70.16,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 70.16,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 50.19,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T12:00:00.000Z",
      tillDateTime: "2022-10-30T13:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 9.41,
        },
        {
          name: "PM10",
          value: 23.11,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 62.76,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 62.76,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 51.35,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T13:00:00.000Z",
      tillDateTime: "2022-10-30T14:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 8.33,
        },
        {
          name: "PM10",
          value: 22.09,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 55.52,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 55.53,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 49.1,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T14:00:00.000Z",
      tillDateTime: "2022-10-30T15:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 9.72,
        },
        {
          name: "PM10",
          value: 21.74,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 64.77,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#C9E41E",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 64.77,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 48.31,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T15:00:00.000Z",
      tillDateTime: "2022-10-30T16:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 14.4,
        },
        {
          name: "PM10",
          value: 26.38,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 95.96,
          level: "LOW",
          description: "Wystarczająco dobre powietrze. Wyjdź na zewnątrz!",
          advice: "Nie ma żadnego zagrożenia dla twojego zdrowia.",
          color: "#E4E11C",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 95.97,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 58.63,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T16:00:00.000Z",
      tillDateTime: "2022-10-30T17:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 21.32,
        },
        {
          name: "PM10",
          value: 34.91,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 142.1,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 142.1,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 77.57,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T17:00:00.000Z",
      tillDateTime: "2022-10-30T18:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 28.58,
        },
        {
          name: "PM10",
          value: 43.92,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 190.51,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 190.52,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 97.6,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T18:00:00.000Z",
      tillDateTime: "2022-10-30T19:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 32.99,
        },
        {
          name: "PM10",
          value: 49.7,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 219.9,
          level: "HIGH",
          description:
            "Powietrze jest zanieczyszczone, ma negatywny wpływ na Twoje zdrowie!",
          advice:
            "Wszyscy mogą odczuwać negatywne skutki zdrowotne, takie jak pogorszenie zdolności poznawczych czy problemy z oddychaniem.",
          color: "#FF761A",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 219.9,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 110.45,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T19:00:00.000Z",
      tillDateTime: "2022-10-30T20:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 33.57,
        },
        {
          name: "PM10",
          value: 51.24,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 223.79,
          level: "HIGH",
          description:
            "Powietrze jest zanieczyszczone, ma negatywny wpływ na Twoje zdrowie!",
          advice:
            "Wszyscy mogą odczuwać negatywne skutki zdrowotne, takie jak pogorszenie zdolności poznawczych czy problemy z oddychaniem.",
          color: "#FF761A",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 223.8,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 113.88,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T20:00:00.000Z",
      tillDateTime: "2022-10-30T21:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 31.75,
        },
        {
          name: "PM10",
          value: 49.83,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 211.64,
          level: "HIGH",
          description:
            "Powietrze jest zanieczyszczone, ma negatywny wpływ na Twoje zdrowie!",
          advice:
            "Wszyscy mogą odczuwać negatywne skutki zdrowotne, takie jak pogorszenie zdolności poznawczych czy problemy z oddychaniem.",
          color: "#FF761A",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 211.64,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 110.73,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T21:00:00.000Z",
      tillDateTime: "2022-10-30T22:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 29.81,
        },
        {
          name: "PM10",
          value: 49.17,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 198.73,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 198.73,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 109.26,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T22:00:00.000Z",
      tillDateTime: "2022-10-30T23:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 27.28,
        },
        {
          name: "PM10",
          value: 47.75,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 181.84,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 181.84,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 106.12,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-30T23:00:00.000Z",
      tillDateTime: "2022-10-31T00:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 25.39,
        },
        {
          name: "PM10",
          value: 45.97,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 169.24,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 169.25,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 102.16,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T00:00:00.000Z",
      tillDateTime: "2022-10-31T01:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 23.84,
        },
        {
          name: "PM10",
          value: 44.21,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 158.91,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 158.91,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 98.24,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T01:00:00.000Z",
      tillDateTime: "2022-10-31T02:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 22.42,
        },
        {
          name: "PM10",
          value: 43.15,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 149.49,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 149.49,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 95.89,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T02:00:00.000Z",
      tillDateTime: "2022-10-31T03:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 22.12,
        },
        {
          name: "PM10",
          value: 41.67,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 147.44,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 147.44,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 92.6,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T03:00:00.000Z",
      tillDateTime: "2022-10-31T04:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 22.39,
        },
        {
          name: "PM10",
          value: 42.42,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 149.28,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#FFC801",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 149.29,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 94.28,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T04:00:00.000Z",
      tillDateTime: "2022-10-31T05:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 23.13,
        },
        {
          name: "PM10",
          value: 43.01,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 154.16,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 154.17,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 95.57,
          averaging: "24h",
        },
      ],
    },
    {
      fromDateTime: "2022-10-31T05:00:00.000Z",
      tillDateTime: "2022-10-31T06:00:00.000Z",
      values: [
        {
          name: "PM25",
          value: 24.22,
        },
        {
          name: "PM10",
          value: 43.53,
        },
      ],
      indexes: [
        {
          name: "AIRLY_AQI",
          value: 161.47,
          level: "MEDIUM",
          description:
            "Powietrze jest zanieczyszczone, może mieć wpływ na zdrowie osób wrażliwych.",
          advice:
            "Osoby wrażliwe mogą odczuwać negatywne skutki zdrowotne, na pozostałe osoby to zanieczyszczenie nie ma wpływu.",
          color: "#F0BA0F",
        },
      ],
      standards: [
        {
          name: "WHO",
          pollutant: "PM25",
          limit: 15,
          percent: 161.48,
          averaging: "24h",
        },
        {
          name: "WHO",
          pollutant: "PM10",
          limit: 45,
          percent: 96.73,
          averaging: "24h",
        },
      ],
    },
  ],
};
