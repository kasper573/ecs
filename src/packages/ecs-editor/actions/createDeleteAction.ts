import { PayloadAction } from "@reduxjs/toolkit";
import { core } from "../core";
import { EditorState } from "../types/EditorState";
import { selectLibraryNode } from "../selectors/selectLibraryNode";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
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
    case "scene":
      const sceneId = selection[mostRecentSelectionName];
      if (!sceneId) {
        return;
      }
      return [
        core.actions.deleteSceneDefinition(sceneId),
        selectSelectedSceneDefinition(state)!.name,
      ];
    case "system":
      const systemId = selection[mostRecentSelectionName];
      if (!systemId) {
        return;
      }
      return [
        core.actions.deleteSystemDefinition(systemId),
        selectSelectedSystemDefinition(state)!.name,
      ];
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
