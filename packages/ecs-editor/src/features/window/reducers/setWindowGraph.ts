import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowState } from "../WindowState";

export const setWindowGraph = createEditorStateReducer<WindowState["graph"]>(
  (state, { payload }) => {
    state.windows.graph = payload;
  }
);
