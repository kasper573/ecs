import { useMemo } from "react";
import { createTree, CreateTreeOptions } from "./createTree";

export const useTree = <Node, Id>(
  nodes: Node[],
  options: CreateTreeOptions<Node, Id>
) =>
  useMemo(() => {
    const map = nodes.reduce(
      (map, node) => map.set(options.getId(node), node),
      new Map<Id, Node>()
    );
    return [map, createTree(nodes, options)] as const;
  }, [nodes, options]);
