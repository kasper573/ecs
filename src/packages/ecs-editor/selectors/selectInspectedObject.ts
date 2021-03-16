import { EditorState } from "../types/EditorState";
import { InspectedSelectionObject } from "../types/InspectedSelectionObject";
import { selectSelectedSystem } from "./selectSelectedSystem";
import { selectSelectedScene } from "./selectSelectedScene";

export const selectInspectedObject = (
  state: EditorState,
  selectedSystem = selectSelectedSystem(state),
  selectedScene = selectSelectedScene(state, selectedSystem)
): InspectedSelectionObject | undefined => {
  const { inspected } = state.selection;
  if (inspected?.type === "entityInitializer") {
    const object = selectedScene?.entities.find(
      (entity) => entity.id === inspected.id
    );
    if (object) {
      return { type: "entityInitializer", object };
    }
  }
  if (inspected?.type === "libraryNode") {
    const object = selectedSystem?.library.find(
      (node) => node.id === inspected.id
    );
    if (object) {
      return { type: "libraryNode", object };
    }
  }
};
