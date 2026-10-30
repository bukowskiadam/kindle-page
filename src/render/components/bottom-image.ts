import type { SvgImage } from "../assets.js";
import { html } from "../html.js";

const IMAGE_WIDTH_PX = 100;
const IMAGE_OPACITY = 0.2;

/** Faded decoration pinned to the bottom-right corner of the page. */
export function BottomImage({ image }: { image: SvgImage }) {
  return html`
    <img
      src=${image.dataUri}
      width=${IMAGE_WIDTH_PX}
      height=${Math.round(IMAGE_WIDTH_PX * image.aspectRatio)}
      style=${{ position: "absolute", right: 0, bottom: 0, opacity: IMAGE_OPACITY }}
    />
  `;
}
