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
  const graph = useSelector(selectWindowGraph);
  const handleWindowChange = (newGraph: WindowState["graph"] | null) => {
    if (newGraph) {
      dispatch(core.actions.setWindowGraph(newGraph));
    }
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

  return (
    <MuiMosaic<WindowId>
      renderTile={renderWindow}
      value={graph}
      onChange={handleWindowChange}
    />
  );
};
const selectWindowGraph = ({ windows }: EditorState) => windows.graph;
