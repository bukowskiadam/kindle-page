# Kindle Page

This is my home dashboard to be shown on the Kindle as a Frame.

There is a Vercel API function that generates the PNG ready to be shown
on the Kindle device.

See related projects:

- Kindle code: https://github.com/bukowskiadam/kindle-onlinescreensaver
- Kindle fetch-file binary: https://github.com/bukowskiadam/fetch-file

## Example

![sample image](screenshot.png)

## Running

1. Install `npm install`
2. Run dev mode `npm start` (needs the project linked with `vercel link`;
   uses mock calendar and Airly data, no `auth` param needed)
3. Deploy to your app `npm run deploy`
4. Regenerate the sample image `npm run screenshot` (mock calendar and Airly
   data; the meteogram and the word of the day are fetched live)
   (optionally pass a day mode: `npm run screenshot -- night`)

## Application flow

```mermaid
sequenceDiagram
    autonumber
    actor kindle as Kindle
    participant screenshot as /api/screenshot
    participant airly as /api/airly
    participant calendar as script.google.com
    participant dictionary as dictionary.com
    participant yr as yr.no
    participant cdn as cdn.airly.org
    kindle ->>+ screenshot: fetch
    par
        screenshot ->> airly: fetch airly
        airly -->> screenshot: current weather
    and
        screenshot ->> calendar: fetch upcoming events
        calendar -->> screenshot: schedule for upcoming days
    and
        screenshot ->> dictionary: fetch word of the day<br>(skipped at night)
        dictionary -->> screenshot: word of the day
    and
        screenshot ->> yr: fetch meteogram SVG<br>(skipped at night)
        yr -->> screenshot: meteogram
    and
        screenshot ->> cdn: fetch Airly logo
        cdn -->> screenshot: logo SVG
    end
    screenshot ->> screenshot: Lay out the page for the day mode<br>(satori: HTML-like templates -> SVG)
    screenshot ->> screenshot: Rasterize (resvg: SVG -> PNG)
    screenshot ->> screenshot: Prepare image for Kindle<br>(grayscale, no alpha)
    screenshot -->>- kindle: dashboard image<br>(+ next-refresh time)
```

Layouts live in `src/render/components` (one file per page module, `layouts.ts`
maps day modes to layouts). Fonts and images are bundled from `assets/`.
