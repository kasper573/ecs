import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import React, { ComponentType } from "react";
import styled from "styled-components";
import { useContextMenu } from "../hooks/useContextMenu";
import { useOnFocusedAndKeyPressed } from "../hooks/useOnFocusedAndKeyPressed";

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
}: CrudListItemProps<D, P>) => {
  const ref = useOnFocusedAndKeyPressed("Delete", onDelete);
  const [triggerProps, menu] = useContextMenu([
    onEdit && <MenuItem onClick={onEdit}>Rename</MenuItem>,
    onDelete && <MenuItem onClick={onDelete}>Delete</MenuItem>,
  ]);

  return (
    <ListItem {...triggerProps} {...listItemProps} innerRef={ref}>
      {menu}
      {Icon && (
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
      )}
      <CrudListItemText primary={name} />
    </ListItem>
  );
};

const CrudListItemText = styled(ListItemText)`
  white-space: nowrap;
`;
