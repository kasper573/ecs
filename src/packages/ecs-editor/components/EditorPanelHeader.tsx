import {
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { AddIcon } from "./icons";
import { OpaqueListSubheader } from "./OpaqueListSubheader";

export type EditorPanelHeaderProps = {
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
 * An opaque box with title and a create button.
 */
export const EditorPanelHeader = ({
  title,
  noun = "",
  onCreate,
}: EditorPanelHeaderProps) => (
  <EditorPanelHeaderLayout title={title}>
    <Tooltip title={`Add ${noun}`.trim()}>
      <IconButton edge="end" aria-label="delete" onClick={onCreate}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  </EditorPanelHeaderLayout>
);

/**
 * THe layout part of the header, useful if you want to customize the action
 */
export const EditorPanelHeaderLayout = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <OpaqueListSubheader>
    {title}
    <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
  </OpaqueListSubheader>
);
