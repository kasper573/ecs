import { without } from "lodash";
import {
  createComponent,
  createEntity,
  createProperty,
  createScene,
  createSystem,
} from "../functions/factories";
import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { EditorActions } from "../types/EditorActions";
import { updateComponent } from "./updateComponent";
import { updateEntity } from "./updateEntity";
import { reactToDelete } from "./reactToDelete";
import { updateScene } from "./updateScene";
import { updateSystem } from "./updateSystem";
import { setSelection } from "./setSelection";
import { updateProperty } from "./updateProperty";

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
    // Systems
    case "CREATE_SYSTEM":
      return {
        ...state,
        systems: [...state.systems, createSystem(action.name)],
      };
    case "DELETE_SYSTEM": {
      const deletedState = {
        ...state,
        systems: without(state.systems, action.system),
      };
      return reactToDelete(state, deletedState, "system", action.system);
    }
    case "RENAME_SYSTEM":
      return updateSystem(state, action.system, { name: action.name });
    case "SELECT_SYSTEM":
      const index = state.systems.indexOf(action.system);
      if (index !== -1) {
        return setSelection(state, "system", index);
      }
      break;

    // Scenes
    case "CREATE_SCENE": {
      const { system } = selectEditorObjects(state);
      if (system) {
        return updateSystem(state, system, {
          scenes: [...system.scenes, createScene(action.name)],
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
    case "RENAME_SCENE":
      return updateScene(state, action.scene, { name: action.name });
    case "SELECT_SCENE": {
      const { system } = selectEditorObjects(state);
      const index = system?.scenes.indexOf(action.scene);
      if (index !== undefined && index !== -1) {
        return setSelection(state, "scene", index);
      }
      break;
    }

    // Entities
    case "CREATE_ENTITY": {
      const { scene } = selectEditorObjects(state);
      if (scene) {
        return updateScene(state, scene, {
          entities: [...scene.entities, createEntity(action.name)],
        });
      }
      break;
    }
    case "DELETE_ENTITY": {
      const selected = selectEditorObjects(state);
      if (selected.scene) {
        const deletedState = updateScene(state, selected.scene, {
          entities: without(selected.scene.entities, action.entity),
        });
        return reactToDelete(state, deletedState, "entity", action.entity);
      }
      break;
    }
    case "RENAME_ENTITY":
      return updateEntity(state, action.entity, { name: action.name });
    case "SELECT_ENTITY": {
      const { scene } = selectEditorObjects(state);
      const index = scene?.entities.indexOf(action.entity);
      if (index !== undefined && index !== -1) {
        return setSelection(state, "entity", index);
      }
      break;
    }

    // Components
    case "CREATE_COMPONENT": {
      const { entity } = selectEditorObjects(state);
      if (entity) {
        return updateEntity(state, entity, {
          components: [...entity.components, createComponent(action.name)],
        });
      }
      break;
    }
    case "DELETE_COMPONENT": {
      const selected = selectEditorObjects(state);
      if (selected.entity) {
        const deletedState = updateEntity(state, selected.entity, {
          components: without(selected.entity.components, action.component),
        });
        return reactToDelete(
          state,
          deletedState,
          "component",
          action.component
        );
      }
      break;
    }
    case "RENAME_COMPONENT":
      return updateComponent(state, action.component, { name: action.name });
    case "SELECT_COMPONENT": {
      const { entity } = selectEditorObjects(state);
      const index = entity?.components.indexOf(action.component);
      if (index !== undefined && index !== -1) {
        return setSelection(state, "component", index);
      }
      break;
    }

    // Properties
    case "CREATE_PROPERTY": {
      const { component } = selectEditorObjects(state);
      if (component) {
        return updateComponent(state, component, {
          properties: [
            ...component.properties,
            createProperty(action.name, action.name),
          ],
        });
      }
      break;
    }
    case "DELETE_PROPERTY": {
      const selected = selectEditorObjects(state);
      if (selected.component) {
        const deletedState = updateComponent(state, selected.component, {
          properties: without(selected.component.properties, action.property),
        });
        return reactToDelete(state, deletedState, "property", action.property);
      }
      break;
    }
    case "RENAME_PROPERTY":
      return updateProperty(state, action.property, { name: action.name });
    case "SELECT_PROPERTY": {
      const { component } = selectEditorObjects(state);
      const index = component?.properties.indexOf(action.property);
      if (index !== undefined && index !== -1) {
        return setSelection(state, "property", index);
      }
      break;
    }
  }
  return state;
}
