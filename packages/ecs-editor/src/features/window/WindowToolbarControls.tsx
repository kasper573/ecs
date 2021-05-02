import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useDispatch } from "../../store";
import { core } from "../../core";
import { CloseIcon } from "../../components/icons";
import { WindowId } from "./WindowId";

export const WindowToolbarControls = ({ id }: { id: WindowId }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(core.actions.closeWindow(id));
  return (
    <Tooltip title="Close">
      <IconButton size="small" edge="end" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};
