import { EditorState } from "../types/EditorState";
import { InspectedObject } from "../types/InspectedObject";
import { get } from "../../nominal";

export const selectInspectedObject = ({
  ecs: { entities, library },
  selection: { inspected },
}: EditorState): InspectedObject | undefined => {
  if (inspected?.type === "entityInitializer") {
    const object = get(entities, inspected.id);
    if (object) {
      return { type: "entityInitializer", object };
    }
  }
  if (inspected?.type === "libraryNode") {
    const object = get(library, inspected.id);
    if (object) {
      return { type: "libraryNode", object };
    }
  }
};
