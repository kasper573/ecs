import { createEditorStateReducer } from "../../functions/createEditorStateReducer";
import { PartialFor } from "../../../../ecs-common/src/PartialFor";
import { getAdjacentEntityIds } from "../../functions/getAdjacentEntityIds";
import { EditorFile, EditorFileId } from "./EditorFile";
import { editorFileAdapter } from "./editorFileAdapter";
import { getEditorFileId } from "./getEditorFileId";

export const editorFileReducers = {
  openEditorFile: createEditorStateReducer<PartialFor<EditorFile, "order">>(
    (state, action) => {
      const openedFile: EditorFile = {
        ...action.payload,
        order: action.payload.order ?? 0,
      };
      state.files = editorFileAdapter.addOne(state.files, openedFile);
      state.selectedFileId = getEditorFileId(openedFile);
    }
  ),
  closeEditorFile: createEditorStateReducer<EditorFileId>(
    (state, { payload: closedId }) => {
      if (closedId === state.selectedFileId) {
        const [before, after] = getAdjacentEntityIds(state.files, closedId);
        state.selectedFileId = after ?? before;
      }
      state.files = editorFileAdapter.removeOne(state.files, closedId);
    }
  ),
  selectEditorFile: createEditorStateReducer<EditorFileId | undefined>(
    (state, action) => {
      state.selectedFileId = action.payload;
    }
  ),
};
