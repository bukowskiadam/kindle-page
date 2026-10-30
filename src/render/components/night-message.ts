import type { SvgImage } from "../assets.ts";
import { html } from "../html.ts";

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
