import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import React, { ComponentType } from "react";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "./icons";

export type CrudListItemProps<
  D extends React.ElementType = "li",
  P = {}
> = ListItemProps<D, P> & {
  /**
   * Called when the edit button is pressed.
   */
  onEdit?: () => void;
  /**
   * Called when the delete button is pressed
   */
  onDelete?: () => void;
  /**
   * Will be displayed as ListItemAvatar
   */
  icon?: ComponentType;
};

/**
 * A ListItem with a name, icon and edit/delete buttons.
 */
export const CrudListItem = <D extends React.ElementType = "li", P = {}>({
  name,
  onEdit,
  onDelete,
  icon: Icon,
  ...listItemProps
}: CrudListItemProps<D, P>) => (
  <ListItem {...listItemProps}>
    {Icon && (
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
    )}
    <CrudListItemText primary={name} />
    <ListItemSecondaryAction>
      {onEdit && (
        <Tooltip title={`Edit ${name}`}>
          <IconButton aria-label="edit" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={`Delete ${name}`} onClick={onDelete}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </ListItemSecondaryAction>
  </ListItem>
);

const CrudListItemText = styled(ListItemText)`
  white-space: nowrap;
`;
