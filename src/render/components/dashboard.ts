import { html } from "../html.ts";
import { COLORS, FONT_FAMILY, FONT_WEIGHT, PAGE_HEIGHT, PAGE_WIDTH } from "../theme.ts";
import { layoutFor, type LayoutProps } from "./layouts.ts";

const ROOT_STYLE = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
  backgroundColor: COLORS.bg,
  color: COLORS.text,
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHT.regular,
};

export function Dashboard(props: LayoutProps) {
  const layout = layoutFor(props.data.dayMode);

  return html`<div style=${ROOT_STYLE}>${layout.render(props)}</div>`;
}
