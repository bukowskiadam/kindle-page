import type { SvgImage } from "../assets.js";
import { html } from "../html.js";

const IMAGE_WIDTH_PX = 400;

export function NightMessage({ image }: { image: SvgImage }) {
  return html`
    <div
      style=${{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src=${image.dataUri}
        width=${IMAGE_WIDTH_PX}
        height=${Math.round(IMAGE_WIDTH_PX * image.aspectRatio)}
      />
      <div style=${{ display: "flex", marginTop: 20, fontSize: 48, fontStyle: "italic" }}>
        Dobranoc!
      </div>
    </div>
  `;
}
