import { createHideUpdate, updateTree } from "react-mosaic-component";
import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowId } from "../WindowId";
import { getPathToKey } from "../getPathToKey";
import { getSplitPercentage } from "../getSplitPercentage";

export const minimizeWindow = createEditorStateReducer<WindowId>(
  (state, { payload: windowId }) => {
    const path = getPathToKey(state.windows.graph, windowId);
    if (!path) {
      throw new Error(`Path does not exist for key: ${windowId}`);
    }

    // Memorize split percentage
    const currentSplitPercentage = getSplitPercentage(
      state.windows.graph,
      windowId
    );
    if (currentSplitPercentage !== undefined) {
      state.windows.splitPercentages[windowId] = currentSplitPercentage;
    }
    // Hide window
    const remove = createHideUpdate(path);
    state.windows.graph = updateTree(state.windows.graph, [remove]);
  }
);
