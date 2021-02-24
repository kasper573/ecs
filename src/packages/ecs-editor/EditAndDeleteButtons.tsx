import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { DeleteIcon, EditIcon } from "./icons";

export type EditAndDeleteButtonsProps = {
  /**
   * Will be displayed as tooltip for the edit/delete buttons
   */
  name: string;
  /**
   * Called when the edit button is pressed.
   */
  onEdit?: () => void;
  /**
   * Called when the delete button is pressed
   */
  onDelete?: () => void;
  /**
   * Enable edit button.
   * (Defaults to true)
   */
  showEdit?: boolean;
  /**
   * Enable delete button.
   * (Defaults to true)
   */
  showDelete?: boolean;
};

/**
 * An edit and delete button with tooltips
 */
export const EditAndDeleteButtons = ({
  name,
  onEdit,
  onDelete,
  showEdit = true,
  showDelete = true,
}: EditAndDeleteButtonsProps) => (
  <>
    {showEdit && (
      <Tooltip title={`Edit ${name}`}>
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    )}
    {showDelete && (
      <Tooltip title={`Delete ${name}`} onClick={onDelete}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )}
  </>
);
