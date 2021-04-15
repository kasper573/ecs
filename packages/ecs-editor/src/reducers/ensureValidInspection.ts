import produce from "immer";
import { getInspectedObject } from "../functions/getInspectedObject";
import { systemRoute } from "../routes/systemRoute";
import { EditorRootState } from "../store";

export const ensureValidInspection = (
  state: EditorRootState
): EditorRootState => {
  const inspectedId = getInspectedObject(state.editor.present)?.object.systemId;
  const selectedId = systemRoute.match(state.router.location)?.params.id;
  if (inspectedId !== selectedId) {
    return produce(state, (draft) => {
      draft.editor.present.inspected = undefined;
    });
  }
  return state;
};
