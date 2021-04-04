import { remove, values } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryFolderId } from "../../ecs-serializable/types/LibraryFolder";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { core } from "../core";
import { deleteEntityDefinition } from "./deleteEntityDefinition";
import { deleteComponentDefinition } from "./deleteComponentDefinition";

export const deleteLibraryFolder = createEditorStateReducer<LibraryFolderId>(
  (state, { payload }) => {
    const folderIdQueue = [payload];
    while (folderIdQueue.length) {
      const id = folderIdQueue.shift()!;
      const folder = state.ecs.libraryFolders[id];
      if (!folder) {
        throw new Error("Could not delete folder");
      }

      // Remove folder node
      remove(state.ecs.libraryFolders, id);

      // Find children
      const isChild = (n: LibraryNode) => n.parentNodeId === folder.nodeId;

      // Queue additional folders for deletion
      const folderIds = values(state.ecs.libraryFolders)
        .filter(isChild)
        .map((node) => node.id);
      folderIdQueue.push(...folderIds);

      // Delete child entity definitions
      const entities = values(state.ecs.entityDefinitions).filter(isChild);
      for (const entity of entities) {
        deleteEntityDefinition(
          state,
          core.actions.deleteEntityDefinition(entity.id)
        );
      }

      // Delete child component definitions
      const components = values(state.ecs.componentDefinitions).filter(isChild);
      for (const component of components) {
        deleteComponentDefinition(
          state,
          core.actions.deleteComponentDefinition(component.id)
        );
      }
    }
  }
);
