import {
  createHideUpdate,
  createRemoveUpdate,
  updateTree,
} from "react-mosaic-component";
import { createEditorStateReducer } from "../../functions/createEditorStateReducer";
import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";
import { getSplitPercentage } from "./getSplitPercentage";
import { getPathToKey } from "./getPathToKey";

export const windowReducers = {
  setWindowGraph: createEditorStateReducer<WindowState["graph"]>(
    (state, { payload }) => {
      state.windows.graph = payload;
    }
  ),
  restoreWindow: createEditorStateReducer<WindowId>(
    (state, { payload: windowId }) => {
      const windowPath = getPathToKey(state.windows.graph, windowId);
      if (!windowPath) {
        throw new Error(`Path does not exist for key: ${windowId}`);
      }
      const pathToContainer = windowPath.slice(0, windowPath.length - 1);
      const expandTo = state.windows.splitPercentages[windowId] ?? 50;
      state.windows.graph = updateTree(state.windows.graph, [
        {
          path: pathToContainer,
          spec: {
            splitPercentage: {
              $set: expandTo,
            },
          },
        },
      ]);
    }
  ),
  minimizeWindow: createEditorStateReducer<WindowId>(
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
  ),
};
