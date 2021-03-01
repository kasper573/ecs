import { without } from "lodash";
import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { EditorActions } from "../types/EditorActions";
import { createSystemDefinition } from "../../ecs-serializable/factories/createSystemDefinition";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { createEntityInitializer } from "../../ecs-serializable/factories/createEntityInitializer";
import { createEntityDefinition } from "../../ecs-serializable/factories/createEntityDefinition";
import { updateEntityDefinition } from "./updateEntityDefinition";
import { reactToDelete } from "./reactToDelete";
import { updateScene } from "./updateScene";
import { updateSystem } from "./updateSystem";
import { selectObject } from "./selectObject";
import { updateLibrary } from "./updateLibrary";
import { updateEntityInitializer } from "./updateEntityInitializer";

/**
 * Controls all state changes for the editor.
 * Returns the changed state for the given action.
 *
 * @param state The current state
 * @param action The action to perform
 */
export function updateState(
  state: EditorState,
  action: EditorActions
): EditorState {
  switch (action.type) {
    // Manual
    case "UPDATE_STATE":
      return { ...state, ...action.update };

    // Systems
    case "CREATE_SYSTEM":
      return {
        ...state,
        systems: [
          ...state.systems,
          createSystemDefinition(action.system, state.nativeComponents),
        ],
      };
    case "DELETE_SYSTEM": {
      const deletedState = {
        ...state,
        systems: without(state.systems, action.system),
      };
      return reactToDelete(state, deletedState, "system", action.system);
    }
    case "UPDATE_SYSTEM":
      return updateSystem(state, action.system, action.update);
    case "SELECT_SYSTEM":
      return selectObject(state, "system", action.system);

    // Scenes
    case "CREATE_SCENE": {
      const { system } = selectEditorObjects(state);
      if (system) {
        return updateSystem(state, system, {
          scenes: [...system.scenes, createSceneDefinition(action.scene)],
        });
      }
      break;
    }
    case "DELETE_SCENE": {
      const selected = selectEditorObjects(state);
      if (selected.system) {
        const deletedState = updateSystem(state, selected.system, {
          scenes: without(selected.system.scenes, action.scene),
        });
        return reactToDelete(state, deletedState, "scene", action.scene);
      }
      break;
    }
    case "UPDATE_SCENE":
      return updateScene(state, action.scene, action.update);
    case "SELECT_SCENE": {
      return selectObject(state, "scene", action.scene);
    }

    // Entity instances
    case "CREATE_ENTITYINITIALIZER": {
      const { scene } = selectEditorObjects(state);
      if (scene) {
        return updateScene(state, scene, {
          entities: [
            ...scene.entities,
            createEntityInitializer(action.entityInitializer),
          ],
        });
      }
      break;
    }
    case "DELETE_ENTITYINITIALIZER": {
      const selected = selectEditorObjects(state);
      if (selected.scene) {
        const deletedState = updateScene(state, selected.scene, {
          entities: without(selected.scene.entities, action.entityInitializer),
        });
        return reactToDelete(
          state,
          deletedState,
          "entityInitializer",
          action.entityInitializer
        );
      }
      break;
    }
    case "UPDATE_ENTITYINITIALIZER":
      return updateEntityInitializer(
        state,
        action.entityInitializer,
        action.update
      );
    case "SELECT_ENTITYINITIALIZER": {
      return selectObject(state, "entityInitializer", action.entityInitializer);
    }

    // Entity definitions
    case "CREATE_ENTITYDEFINITION": {
      const selected = selectEditorObjects(state);
      return updateLibrary(state, selected.system, ({ entities }) => ({
        entities: [
          ...entities,
          createEntityDefinition(action.entityDefinition),
        ],
      }));
    }
    case "DELETE_ENTITYDEFINITION": {
      const selected = selectEditorObjects(state);
      const deletedState = updateLibrary(
        state,
        selected.system,
        ({ entities }) => ({
          entities: without(entities, action.entityDefinition),
        })
      );
      return reactToDelete(
        state,
        deletedState,
        "entityDefinition",
        action.entityDefinition
      );
    }
    case "UPDATE_ENTITYDEFINITION":
      return updateEntityDefinition(
        state,
        action.entityDefinition,
        action.update
      );
    case "SELECT_ENTITYDEFINITION": {
      return selectObject(state, "entityDefinition", action.entityDefinition);
    }

    // Component definitions
    case "SELECT_COMPONENTDEFINITION": {
      return selectObject(
        state,
        "componentDefinition",
        action.componentDefinition
      );
    }
  }
  return state;
}
