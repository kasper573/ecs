import { remove } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { core } from "../slices/core";
import { selectListOfSceneDefinition } from "../selectors/selectListOfSceneDefinition";
import { selectListOfComponentDefinition } from "../selectors/selectListOfComponentDefinition";
import { selectListOfEntityDefinition } from "../selectors/selectListOfEntityDefinition";
import { selectListOfLibraryFolder } from "../selectors/selectListOfLibraryFolder";
import { deleteSceneDefinition } from "./deleteSceneDefinition";
import { deleteEntityDefinition } from "./deleteEntityDefinition";
import { deleteLibraryFolder } from "./deleteLibraryFolder";
import { deleteComponentDefinition } from "./deleteComponentDefinition";

export const deleteSystemDefinition = createEditorStateReducer<SystemDefinitionId>(
  (state, { payload: id }) => {
    if (!remove(state.ecs.systems, id)) {
      throw new Error("Could not delete system");
    }
    // Delete related objects
    for (const scene of selectListOfSceneDefinition(state, id)) {
      deleteSceneDefinition(
        state,
        core.actions.deleteSceneDefinition(scene.id)
      );
    }
    for (const def of selectListOfEntityDefinition(state, id)) {
      deleteEntityDefinition(
        state,
        core.actions.deleteEntityDefinition(def.id)
      );
    }
    for (const def of selectListOfComponentDefinition(state, id)) {
      deleteComponentDefinition(
        state,
        core.actions.deleteComponentDefinition(def.id)
      );
    }

    // Delete only root folders because deleteLibraryFolder deletes ancestors already
    const rootFolders = selectListOfLibraryFolder(state, id).filter(
      (folder) => !folder.parentNodeId
    );
    for (const folder of rootFolders) {
      deleteLibraryFolder(state, core.actions.deleteLibraryFolder(folder.id));
    }
  }
);
