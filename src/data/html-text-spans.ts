import { HTMLElement, type Node, TextNode } from "node-html-parser";

import type { TextSpan } from "../types.ts";

type SpanFormat = Omit<TextSpan, "text">;

const BOLD_TAGS = new Set(["b", "strong"]);
const ITALIC_TAGS = new Set(["i", "em"]);

/**
 * Flattens an element's inline HTML (<b>, <strong>, <i>, <em>) into text
 * spans with formatting flags. Other tags keep only their text. Whitespace
 * is collapsed like in a browser and neighbouring spans with the same
 * formatting are merged.
 */
export function htmlToTextSpans(element: HTMLElement): TextSpan[] {
  const spans = mergeSameFormat(collectSpans(element, {}));

  return trimEdges(spans).filter((span) => span.text.length > 0);
}

function collectSpans(node: Node, format: SpanFormat): TextSpan[] {
  if (node instanceof TextNode) {
    return [{ text: node.text.replace(/\s+/g, " "), ...format }];
  }

  if (!(node instanceof HTMLElement)) {
    return [];
  }

  const tag = node.tagName?.toLowerCase() ?? "";
  const childFormat: SpanFormat = {
    ...format,
    ...(BOLD_TAGS.has(tag) && { bold: true }),
    ...(ITALIC_TAGS.has(tag) && { italic: true }),
  };

  return node.childNodes.flatMap((child) => collectSpans(child, childFormat));
}

function mergeSameFormat(spans: TextSpan[]): TextSpan[] {
  return spans.reduce<TextSpan[]>((merged, span) => {
    const previous = merged.at(-1);

    if (previous && hasSameFormat(previous, span)) {
      return [...merged.slice(0, -1), { ...previous, text: previous.text + span.text }];
    }

    return [...merged, span];
  }, []);
}

function hasSameFormat(a: TextSpan, b: TextSpan): boolean {
  return Boolean(a.bold) === Boolean(b.bold) && Boolean(a.italic) === Boolean(b.italic);
}

function trimEdges(spans: TextSpan[]): TextSpan[] {
  return spans.map((span, index) => {
    const isFirst = index === 0;
    const isLast = index === spans.length - 1;
    let text = span.text;

    if (isFirst) text = text.trimStart();
    if (isLast) text = text.trimEnd();

    return { ...span, text };
  });
}
