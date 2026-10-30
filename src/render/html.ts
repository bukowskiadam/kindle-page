import htmModule from "htm";
import { createElement, type ReactNode } from "react";

// htm's typings are resolved as CommonJS under NodeNext, while at runtime
// its ESM build exports the function itself as default.
const htm = htmModule as unknown as typeof htmModule.default;

/**
 * JSX-like tagged templates producing React elements for satori.
 * Used instead of .tsx files because Vercel's Node builder does not
 * trace .tsx modules imported from functions.
 */
export const html = htm.bind(createElement) as (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => ReactNode;
