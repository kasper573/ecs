import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowState } from "../WindowState";

export const setWindowState = createEditorStateReducer<WindowState>(
  (state, { payload }) => {
    state.windows = payload;
  }
);
