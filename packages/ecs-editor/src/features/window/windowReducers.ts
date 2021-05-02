import { createRemoveUpdate, updateTree } from "react-mosaic-component";
import { createEditorStateReducer } from "../../functions/createEditorStateReducer";
import { WindowState } from "./WindowState";
import { WindowPath } from "./WindowPath";

export const windowReducers = {
  setWindowState: createEditorStateReducer<WindowState>(
    (state, { payload }) => {
      state.windows = payload;
    }
  ),
  closeWindow: createEditorStateReducer<WindowPath>((state, { payload }) => {
    const remove = createRemoveUpdate(state.windows, payload);
    state.windows = updateTree(state.windows, [remove]);
  }),
};
