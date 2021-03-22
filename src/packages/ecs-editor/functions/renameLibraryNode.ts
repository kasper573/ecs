import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

export const renameLibraryNode = (
  node: LibraryNode,
  name: string
): LibraryNode => {
  switch (node.type) {
    case "entity":
      return {
        ...node,
        entity: {
          ...node.entity,
          name,
        },
      };
    case "component":
      return {
        ...node,
        component: {
          ...node.component,
          name,
        },
      };
    case "folder":
      return {
        ...node,
        name,
      };
  }
};
