import { PayloadAction } from "@reduxjs/toolkit";
import { core } from "../core";
import { EditorState } from "../types/EditorState";
import { selectLibraryNode } from "../selectors/selectLibraryNode";
import { selectSelectedEntityInitializer } from "../selectors/selectSelectedEntityInitializer";
import { createDeleteLibraryNodeAction } from "./createDeleteLibraryNodeAction";

export type DeleteTarget = [
  PayloadAction<unknown>,
  string // Target name
];

export const createDeleteAction = (
  state: EditorState
): DeleteTarget | undefined => {
  const { selection, mostRecentSelectionName } = state;
  if (!mostRecentSelectionName) {
    return;
  }
  switch (mostRecentSelectionName) {
    case "inspected":
      const inspected = selection[mostRecentSelectionName];
      if (!inspected) {
        return;
      }
      switch (inspected.type) {
        case "libraryNode":
          const node = selectLibraryNode(state, inspected.id);
          if (!node) {
            return;
          }
          const action = createDeleteLibraryNodeAction(node);
          return [action, node.name];
        case "entityInitializer":
          return [
            core.actions.deleteEntityInitializer(inspected.id),
            selectSelectedEntityInitializer(state)!.name,
          ];
      }
  }
};
