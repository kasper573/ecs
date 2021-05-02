import { MosaicBranch, MosaicWindow } from "react-mosaic-component";
import React from "react";
import { WindowId } from "./WindowId";
import { windowDefinitions } from "./windowDefinitions";
import { WindowToolbarControls } from "./WindowToolbarControls";

export const renderWindow = (id: WindowId, path: MosaicBranch[]) => {
  const { panel, title } = windowDefinitions[id];
  return (
    <MosaicWindow
      path={path}
      title={title}
      toolbarControls={<WindowToolbarControls path={path} />}
    >
      {panel}
    </MosaicWindow>
  );
};
