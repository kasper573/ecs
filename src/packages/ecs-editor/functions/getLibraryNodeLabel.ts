import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

export const getLibraryNodeLabel = (node: LibraryNode): string => {
  switch (node.type) {
    case "folder":
      return node.name;
    case "entity":
      return node.entity.name;
    case "component":
      return node.component.name;
  }
};
