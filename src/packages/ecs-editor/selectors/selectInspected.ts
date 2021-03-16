import { EditorState } from "../types/EditorState";
import { InspectedObject } from "../types/EditorSelection";
import { selectSelectedSystem } from "./selectSelectedSystem";
import { selectSelectedScene } from "./selectSelectedScene";

export const selectInspected = (
  state: EditorState,
  selectedSystem = selectSelectedSystem(state),
  selectedScene = selectSelectedScene(state, selectedSystem)
): InspectedObject | undefined => {
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
