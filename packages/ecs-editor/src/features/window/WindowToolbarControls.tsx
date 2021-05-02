import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useDispatch } from "../../store";
import { core } from "../../core";
import { CloseIcon } from "../../components/icons";
import { WindowPath } from "./WindowPath";

export const WindowToolbarControls = ({ path }: { path: WindowPath }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(core.actions.closeWindow(path));
  return (
    <Tooltip title="Close">
      <IconButton size="small" edge="end" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};
