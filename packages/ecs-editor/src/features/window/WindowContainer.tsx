import React, { useCallback } from "react";
import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import { useDispatch, useSelector } from "../../store";
import { core } from "../../core";
import { MuiMosaic } from "../../components/MuiMosaic";
import { WindowState } from "./WindowState";
import { WindowToolbarControls } from "./WindowToolbarControls";
import { WindowId } from "./WindowId";
import { selectWindows } from "./selectWindows";

type Window = {
  title: string;
  content: JSX.Element;
};

type WindowContainerProps = {
  windowDefinitions: Record<string, Window>;
};

export const WindowContainer = ({
  windowDefinitions,
}: WindowContainerProps) => {
  const dispatch = useDispatch();
  const windows = useSelector(selectWindows);

  const receiveWindowState = (updated: WindowState) => {
    dispatch(core.actions.setWindowState(updated));
  };

  const renderWindow = useCallback(
    (id: WindowId, path: MosaicBranch[]) => {
      const { content, title } = windowDefinitions[id];
      return (
        <MosaicWindow
          path={path}
          title={title}
          toolbarControls={<WindowToolbarControls id={id} />}
        >
          {content}
        </MosaicWindow>
      );
    },
    [windowDefinitions]
  );

  if (!windows) {
    // Empty
    return null;
  }

  return (
    <MuiMosaic<WindowId>
      renderTile={renderWindow}
      value={windows}
      onChange={receiveWindowState}
    />
  );
};
