import { PayloadAction } from "@reduxjs/toolkit";
import { core } from "../core";
import { TypedLibraryNode } from "../types/TypedLibraryNode";

export const createDuplicateLibraryNodeAction = (
  node: TypedLibraryNode
): PayloadAction<unknown> | undefined => {
  switch (node.type) {
    case "entity":
      return core.actions.duplicateEntityDefinition(node.id);
    case "component":
      return core.actions.duplicateComponentDefinition(node.id);
  }
};
