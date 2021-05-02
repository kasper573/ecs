import React from "react";
import { useDispatch, useSelector } from "../../store";
import { core } from "../../core";
import { MuiMosaic } from "../../components/MuiMosaic";
import { EditorState } from "../../types/EditorState";
import { WindowState } from "./WindowState";
import { WindowId } from "./WindowId";
import { renderWindow } from "./renderWindow";

export const WindowContainer = () => {
  const dispatch = useDispatch();
  const windows = useSelector(selectWindowState);
  const handleWindowChange = (newWindows: WindowState | null) => {
    if (newWindows) {
      dispatch(core.actions.setWindowState(newWindows));
    }
  };
  return (
    <MuiMosaic<WindowId>
      renderTile={renderWindow}
      value={windows}
      onChange={handleWindowChange}
    />
  );
};

const selectWindowState = ({ windows }: EditorState) => windows;
