import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { setSelectedObject } from "./setSelectedObject";

export const selectSystemDefinition = createEditorStateReducer<SystemDefinitionId>(
  (state, { payload: systemId }) =>
    setSelectedObject(state, {
      objectName: "system",
      selectedValue: systemId,
    })
);
