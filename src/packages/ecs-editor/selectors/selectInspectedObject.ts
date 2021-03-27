import { EditorState } from "../types/EditorState";
import { InspectedObject } from "../types/InspectedObject";
import { get } from "../../ecs-common/nominal";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { selectLibraryNode } from "./selectLibraryNode";

export const selectInspectedObject = createMemoizedSelector(
  (state: EditorState): InspectedObject | undefined => {
    const {
      ecs: { entityInitializers },
      selection: { inspected },
    } = state;
    if (inspected?.type === "entityInitializer") {
      const object = get(entityInitializers, inspected.id);
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
  },
  (obj) => obj
);
