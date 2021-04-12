import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import {
  setSelectedObject,
  setSelectedObjectAction,
} from "./setSelectedObject";

export const setSelectedSystemDefinition = createEditorStateReducer<
  SystemDefinitionId | undefined
>((state, { payload: systemId }) =>
  setSelectedObject(
    state,
    setSelectedObjectAction({ type: "system", value: systemId })
  )
);
