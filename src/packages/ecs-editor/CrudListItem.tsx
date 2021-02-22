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
import { noop } from "./noop";

export type CrudListItemProps<
  D extends React.ElementType = "li",
  P = {}
> = ListItemProps<D, P> & {
  /**
   * Will be displayed as primary text
   */
  name: string;
  /**
   * Will be displayed as ListItemAvatar
   */
  icon: ComponentType;
  /**
   * Called when the edit button is pressed
   */
  onEdit?: () => void;
  /**
   * Called when the delete button is pressed
   */
  onDelete?: () => void;
};

/**
 * A ListItem with a name, icon and edit/delete buttons.
 */
export const CrudListItem = <D extends React.ElementType = "li", P = {}>({
  name,
  onEdit = noop,
  onDelete = noop,
  icon: Icon,
  ...listItemProps
}: CrudListItemProps<D, P>) => (
  <ListItem {...listItemProps}>
    <ListItemAvatar>
      <Avatar>
        <Icon />
      </Avatar>
    </ListItemAvatar>
    <CrudListItemText primary={name} secondary="Secondary text" />
    <ListItemSecondaryAction>
      <Tooltip title={`Edit ${name}`}>
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Delete ${name}`} onClick={onDelete}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  </ListItem>
);

const CrudListItemText = styled(ListItemText)`
  white-space: nowrap;
`;
