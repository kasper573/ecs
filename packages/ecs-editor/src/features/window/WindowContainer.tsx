import React, { useCallback } from "react";
import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import { useDispatch, useSelector } from "../../store";
import { core } from "../../core";
import { MuiMosaic } from "../../components/MuiMosaic";
import { EditorState } from "../../types/EditorState";
import { WindowState } from "./WindowState";
import { WindowToolbarControls } from "./WindowToolbarControls";

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
  const windowState = useSelector(selectWindowState);
  const handleWindowChange = (newWindows: WindowState | null) => {
    if (newWindows) {
      dispatch(core.actions.setWindowState(newWindows));
    }
  };

  const renderWindow = useCallback(
    (id: string, path: MosaicBranch[]) => {
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
    <MuiMosaic
      renderTile={renderWindow}
      value={windowState}
      onChange={handleWindowChange}
    />
  );
};

const selectWindowState = ({ windows }: EditorState) => windows;
