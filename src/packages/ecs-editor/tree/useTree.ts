import { useMemo } from "react";
import { createTree, CreateTreeOptions } from "./createTree";

export const useTree = <Node, Id extends string>(
  nodes: Node[],
  options: CreateTreeOptions<Node, Id>
) =>
  useMemo(() => {
    const map = nodes.reduce((map, node) => {
      map[options.getId(node)] = node;
      return map;
    }, {} as Record<Id, Node>);
    return [map, createTree(nodes, options)] as const;
  }, [nodes, options]);
