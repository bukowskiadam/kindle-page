import {
  losslessCompressPngSync,
  Orientation,
  Transformer,
} from "@napi-rs/image";
import type { ImageForKindleOpts } from "./types.ts";

export function imageForKindle(
  buffer: Buffer,
  { rotate = false }: ImageForKindleOpts = {}
): Buffer {
  const grayscale = new Transformer(new Uint8Array(buffer))
    .grayscale()
    // rotating because my kindle is upside-down
    .rotate(rotate ? Orientation.Rotate180 : null)
    .pngSync();

  return losslessCompressPngSync(grayscale, {
    grayscaleReduction: false,
    strip: true,
  });
}
