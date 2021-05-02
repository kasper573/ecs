import { isParent, MosaicNode, MosaicParent } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/lib/types";
import { MosaicDirection } from "react-mosaic-component/src/types";
import { createEditorStateReducer } from "../../../functions/createEditorStateReducer";
import { WindowId } from "../WindowId";
import { isWindowOpen } from "../isWindowOpen";

export const openWindow = createEditorStateReducer<WindowId>(
  (state, { payload: windowId }) => {
    if (isWindowOpen(state.windows, windowId)) {
      // Already open, nothing to do
      return;
    }
    if (!state.windows) {
      // Opening the first and only window
      state.windows = windowId;
    } else if (!isParent(state.windows)) {
      // Opening a second window. Put side by side.
      state.windows = join(windowId, state.windows, "row");
    } else {
      // At least two windows open. Put new window beneath first slot.
      state.windows = {
        ...state.windows,
        first: join(state.windows.first, windowId, "column"),
      };
    }
  }
);

const join = <T extends MosaicKey>(
  first: MosaicNode<T>,
  second: MosaicNode<T>,
  direction: MosaicDirection
): MosaicParent<T> => ({
  direction,
  first,
  second,
  splitPercentage: 50,
});
