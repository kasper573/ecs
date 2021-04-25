import { createEditorStateReducer } from "../../functions/createEditorStateReducer";
import { getAdjacentEntityIds } from "../../functions/getAdjacentEntityIds";
import { CodeFile, CodeFileId } from "./CodeFile";
import { codeFileAdapter } from "./codeFileAdapter";

export const codeFileReducers = {
  openCodeFile: createEditorStateReducer<CodeFileId>(
    (state, { payload: id }) => {
      const file: CodeFile = { id, order: 0 };
      state.codeFiles = codeFileAdapter.addOne(state.codeFiles, file);
      state.selectedCodeFileId = id;
    }
  ),
  closeCodeFile: createEditorStateReducer<CodeFileId>(
    (state, { payload: closedId }) => {
      if (closedId === state.selectedCodeFileId) {
        const [before, after] = getAdjacentEntityIds(state.codeFiles, closedId);
        state.selectedCodeFileId = after ?? before;
      }
      state.codeFiles = codeFileAdapter.removeOne(state.codeFiles, closedId);
    }
  ),
  selectCodeFile: createEditorStateReducer<CodeFileId | undefined>(
    (state, action) => {
      state.selectedCodeFileId = action.payload;
    }
  ),
};
