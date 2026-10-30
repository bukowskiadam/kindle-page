import { METEOGRAM_CROP } from "../assets.js";
import { html } from "../html.js";
import { COLORS } from "../theme.js";

export function Forecast({ meteogramDataUri }: { meteogramDataUri: string }) {
  return html`
    <div
      style=${{
        display: "flex",
        flexShrink: 0,
        paddingTop: 4,
        borderTop: `1px solid ${COLORS.alternativeBg}`,
      }}
    >
      <img
        src=${meteogramDataUri}
        width=${METEOGRAM_CROP.width}
        height=${METEOGRAM_CROP.height}
      />
    </div>
  `;
}
