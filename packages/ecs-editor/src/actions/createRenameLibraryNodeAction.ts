import { PayloadAction } from "@reduxjs/toolkit";
import { core } from "../core";
import { TypedLibraryNode } from "../types/TypedLibraryNode";

export const createRenameLibraryNodeAction = (
  target: TypedLibraryNode,
  name: string
): PayloadAction<unknown> => {
  switch (target.type) {
    case "entity":
      return core.actions.renameEntityDefinition({ id: target.id, name });
    case "component":
      return core.actions.renameComponentDefinition({ id: target.id, name });
    case "folder":
      return core.actions.renameLibraryFolder({ id: target.id, name });
  }
};
