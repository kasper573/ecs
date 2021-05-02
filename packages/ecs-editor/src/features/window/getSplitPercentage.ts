import { getNodeAtPath, isParent } from "react-mosaic-component";
import { MosaicKey, MosaicNode } from "react-mosaic-component/src/types";
import { getPathToKey } from "./getPathToKey";

export const getSplitPercentage = <T extends MosaicKey>(
  tree: MosaicNode<T>,
  key: T
) => {
  const path = getPathToKey(tree, key);
  const node = path && getNodeAtPath(tree, path.slice(0, path.length - 1));
  return node && isParent(node) ? node.splitPercentage : undefined;
};
