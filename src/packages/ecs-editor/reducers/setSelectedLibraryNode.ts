import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/definition/LibraryNode";
import {
  setSelectedObject,
  setSelectedObjectAction,
} from "./setSelectedObject";

export const setSelectedLibraryNode = createEditorStateReducer<LibraryNodeId>(
  (state, { payload: nodeId }) =>
    setSelectedObject(
      state,
      setSelectedObjectAction({
        type: "inspected",
        value: { type: "libraryNode", id: nodeId },
      })
    )
);
