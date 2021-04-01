import { PayloadAction } from "@reduxjs/toolkit";
import { core } from "../core";
import { TypedLibraryNode } from "../types/TypedLibraryNode";

export const createDeleteLibraryNodeAction = (
  node: TypedLibraryNode
): PayloadAction<unknown> => {
  switch (node.type) {
    case "entity":
      return core.actions.deleteEntityDefinition(node.id);
    case "component":
      return core.actions.deleteComponentDefinition(node.id);
    case "folder":
      return core.actions.deleteLibraryFolder(node.id);
  }
};
