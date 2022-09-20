import {
  losslessCompressPngSync,
  Orientation,
  Transformer,
} from "@napi-rs/image";
import { ImageForKindleOpts } from "./types";

export function imageForKindle(
  buffer: Buffer,
  { rotate = false }: ImageForKindleOpts = {}
): Buffer {
  const grayscale = new Transformer(buffer)
    .grayscale()
    // rotating because my kindle is upside-down
    .rotate(rotate ? Orientation.Rotate180 : null)
    .pngSync();

  return losslessCompressPngSync(grayscale);
}
