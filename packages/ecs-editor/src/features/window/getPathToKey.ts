import { isParent, MosaicNode, MosaicPath } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/lib/types";

export function getPathToKey<T extends MosaicKey>(
  haystack: MosaicNode<T>,
  needle: T,
  path: MosaicPath = []
): MosaicPath | undefined {
  if (!isParent(haystack)) {
    return haystack === needle ? path : undefined;
  }
  if (haystack.first === needle) {
    return [...path, "first"];
  }
  if (haystack.second === needle) {
    return [...path, "second"];
  }
  if (isParent(haystack.first)) {
    const res = getPathToKey(haystack.first, needle, [...path, "first"]);
    if (res !== undefined) {
      return res;
    }
  }
  return isParent(haystack.second)
    ? getPathToKey(haystack.second, needle, [...path, "second"])
    : undefined;
}
