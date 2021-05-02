import {
  createRemoveUpdate,
  getNodeAtPath,
  isParent,
  updateTree,
} from "react-mosaic-component";
import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowPath } from "../WindowPath";

export const closeWindow = createEditorStateReducer<WindowPath>(
  (state, { payload }) => {
    if (!state.windows) {
      // No windows available to close
      return;
    }
    if (isParent(state.windows)) {
      // createRemoveUpdate only handles removes from inside root
      const remove = createRemoveUpdate(state.windows, payload);
      state.windows = updateTree(state.windows, [remove]);
    } else {
      // Only one window open, set to null if this is the window to close
      if (state.windows === getNodeAtPath(state.windows, payload)) {
        state.windows = null;
      }
    }
  }
);
