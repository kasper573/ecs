import {
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { AddIcon } from "./icons";
import { OpaqueListSubheader } from "./OpaqueListSubheader";

export type CrudListSubheaderProps = {
  /**
   * The title of the header
   */
  title: string;
  /**
   * The noun to use for the button tooltip
   */
  noun?: string;
  /**
   * Called when the create button is pressed
   * (No create button is shown if this callback is not specified)
   */
  onCreate?: () => void;
};

/**
 * A list header with a create button
 */
export const CrudListSubheader = ({
  title,
  noun,
  onCreate,
}: CrudListSubheaderProps) => (
  <OpaqueListSubheader>
    {title}
    {onCreate && (
      <ListItemSecondaryAction>
        <Tooltip title={`Add ${noun}`.trim()}>
          <IconButton edge="end" aria-label="delete" onClick={onCreate}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    )}
  </OpaqueListSubheader>
);
