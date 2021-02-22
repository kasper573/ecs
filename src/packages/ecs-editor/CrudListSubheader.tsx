import {
  IconButton,
  ListItemSecondaryAction,
  ListSubheader,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { AddIcon } from "./icons";

export type CrudListSubheaderProps = {
  /**
   * The title of the header
   */
  title: string;
  /**
   * Called when the create button is pressed
   */
  onCreate: () => void;
};

/**
 * A list header with a create button
 */
export const CrudListSubheader = ({
  title,
  onCreate,
}: CrudListSubheaderProps) => (
  <ListSubheader component="div">
    {title}
    <ListItemSecondaryAction>
      <Tooltip title={`Add ${title}`}>
        <IconButton edge="end" aria-label="delete" onClick={onCreate}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  </ListSubheader>
);
