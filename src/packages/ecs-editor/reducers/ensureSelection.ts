import { selectDefaultSelectionValue } from "../selectors/selectDefaultSelectionValue";
import {
  EditorSelectionName,
  editorSelectionOrder,
} from "../types/EditorSelection";
import { EditorState } from "../types/EditorState";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";
import { selectInspectedObject } from "../selectors/selectInspectedObject";
import { setSelectedObject } from "./setSelectedObject";

/**
 * Ensures selection for objects that has a default available.
 * (Returns the original state object if no selection was changed)
 */
export const ensureSelection = (state: EditorState): EditorState =>
  editorSelectionOrder.reduce(
    <ObjectName extends EditorSelectionName>(
      state: EditorState,
      objectName: ObjectName
    ) => {
      const resolvedObject = objectSelectors[objectName](state);
      if (resolvedObject) {
        return state; // Current selection is valid
      }
      return setSelectedObject(state, {
        objectName,
        selectedValue: selectDefaultSelectionValue(state, objectName),
      });
    },
    state
  );

const objectSelectors = {
  system: selectSelectedSystemDefinition,
  scene: selectSelectedSceneDefinition,
  inspected: selectInspectedObject,
};
