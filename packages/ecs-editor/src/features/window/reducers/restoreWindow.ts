import { updateTree } from "react-mosaic-component";
import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowId } from "../WindowId";
import { getPathToKey } from "../getPathToKey";

export const restoreWindow = createEditorStateReducer<WindowId>(
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
);
