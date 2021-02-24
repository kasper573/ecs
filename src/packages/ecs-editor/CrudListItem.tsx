import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { ComponentType } from "react";
import styled from "styled-components";
import {
  EditAndDeleteButtons,
  EditAndDeleteButtonsProps,
} from "./EditAndDeleteButtons";

export type CrudListItemProps<
  D extends React.ElementType = "li",
  P = {}
> = ListItemProps<D, P> &
  EditAndDeleteButtonsProps & {
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
  showEdit,
  showDelete,
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
      <EditAndDeleteButtons
        name={name}
        onEdit={onEdit}
        onDelete={onDelete}
        showEdit={showEdit}
        showDelete={showDelete}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

const CrudListItemText = styled(ListItemText)`
  white-space: nowrap;
`;
