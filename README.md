# Kindle-page

This is my home page to be shown on the Kindle as a Frame.

There is a Vercel API function that generates the PNG ready to be shown
on the Kindle device.

See related projects:

- Kindle code: https://github.com/bukowskiadam/kindle-onlinescreensaver
- Kindle fetch-file binary: https://github.com/bukowskiadam/fetch-file

## Running

1. Install `npm install`
2. Run dev mode `npm start`
3. Deploy to your app `npm run deploy`

The image is **upside-down** because my Kindle is upside-down in the picture frame.

## Application flow

```mermaid
sequenceDiagram
    autonumber
    actor kindle as Kindle
    participant screenshot as /api/screenshot
    participant playwright
    participant page as /api/page
    participant airly as /api/airly
    participant calendar as script.google.com
    participant quote as Random quote
    kindle ->>+ screenshot: fetch
    screenshot ->>+ page: request to warm-up cache
    screenshot ->>+ playwright: run the browser
    par
        page ->> airly: fetch airly
        airly -->> page: current weather
    and
        page ->> calendar: fetch upcoming events
        calendar -->> page: schedule for upcoming days
    and
        page ->> quote: fetch random quote
        quote -->> page: random quote
    end
    page -->>- screenshot: Response is discarded but stored<br>in the edge cache
    screenshot ->> playwright: instruct to<br>open the page
    playwright ->>+ page: request again
    page -->>- playwright: cached HTML
    playwright -->> playwright: Wait 500ms for<br>fonts, weather image
    playwright -->>- screenshot: PNG image
    screenshot ->> screenshot: Prepare image for Kindle<br>(grayscale, no alpha)
    screenshot -->>- kindle: dashboard image<br>(+ next-refresh time)
```