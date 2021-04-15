import { EditorState } from "../types/EditorState";
import { InspectedObject } from "../types/InspectedObject";
import { selectLibraryNode } from "../selectors/selectLibraryNode";

export const getInspectedObject = (
  state: EditorState
): InspectedObject | undefined => {
  const {
    ecs: { entityInitializers },
    inspected,
  } = state;
  if (inspected?.type === "entityInitializer") {
    const object = entityInitializers[inspected.id];
    if (object) {
      return { type: "entityInitializer", object };
    }
  }
  if (inspected?.type === "libraryNode") {
    const object = selectLibraryNode(state, inspected.id);
    if (object) {
      return { type: "libraryNode", object };
    }
  }
};
