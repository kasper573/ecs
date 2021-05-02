import React, { useCallback } from "react";
import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import { useDispatch, useSelector } from "../../store";
import { core } from "../../core";
import { MuiMosaic } from "../../components/MuiMosaic";
import { EditorState } from "../../types/EditorState";
import { WindowState } from "./WindowState";
import { WindowToolbarControls } from "./WindowToolbarControls";
import { WindowId } from "./WindowId";

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
          toolbarControls={<WindowToolbarControls path={path} />}
        >
          {content}
        </MosaicWindow>
      );
    },
    [windowDefinitions]
  );

  return (
    <MuiMosaic<WindowId>
      renderTile={renderWindow}
      value={windows}
      onChange={receiveWindowState}
    />
  );
};

const selectWindows = ({ windows }: EditorState) => windows;
