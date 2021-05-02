import React, { useCallback, useContext } from "react";
import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import { useDispatch, useSelector } from "../../store";
import { core } from "../../core";
import { MuiMosaic } from "../../components/MuiMosaic";
import { WindowState } from "./WindowState";
import { WindowToolbarControls } from "./WindowToolbarControls";
import { WindowId } from "./WindowId";
import { selectWindows } from "./selectWindows";
import { WindowDefinitionContext } from "./WindowDefinitionContext";

export const WindowRenderer = () => {
  const dispatch = useDispatch();
  const windowDefinitions = useContext(WindowDefinitionContext);
  const windowState = useSelector(selectWindows);

  const receiveWindowState = (updated: WindowState) => {
    dispatch(core.actions.setWindowState(updated));
  };

  const renderWindow = useCallback(
    (id: WindowId, path: MosaicBranch[]) => {
      const def = windowDefinitions.find((def) => def.id === id);
      return (
        <MosaicWindow
          path={path}
          title={def?.title ?? id}
          toolbarControls={<WindowToolbarControls id={id} />}
        >
          {def ? def.content : `Unknown window: "${id}"`}
        </MosaicWindow>
      );
    },
    [windowDefinitions]
  );

  if (!windowState) {
    // Empty
    return null;
  }

  return (
    <MuiMosaic<WindowId>
      renderTile={renderWindow}
      value={windowState}
      onChange={receiveWindowState}
    />
  );
};
