import {
  createRemoveUpdate,
  getNodeAtPath,
  isParent,
  updateTree,
} from "react-mosaic-component";
import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowId } from "../WindowId";
import { getPathToKey } from "../getPathToKey";

export const closeWindow = createEditorStateReducer<WindowId>(
  (state, { payload }) => {
    const path = getPathToKey(state.windows, payload);
    if (!path) {
      throw new Error(`No window available for path "${path}"`);
    }
    if (!state.windows) {
      // No windows available to close
      return;
    }
    if (isParent(state.windows)) {
      // createRemoveUpdate only handles removes from inside root
      const remove = createRemoveUpdate(state.windows, path);
      state.windows = updateTree(state.windows, [remove]);
    } else {
      // Only one window open, set to null if this is the window to close
      if (state.windows === getNodeAtPath(state.windows, path)) {
        state.windows = null;
      }
    }
  }
);
