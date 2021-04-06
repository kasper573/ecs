import { PropsWithChildren, ReactNode } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

export type InspectedObjectInfoProps = PropsWithChildren<{
  icon: ReactNode;
  name: ReactNode;
}>;

export const InspectedObjectInfo = ({
  icon,
  name,
  children,
}: InspectedObjectInfoProps) => (
  <>
    <Divider />
    <List disablePadding>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
        {children && (
          <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
        )}
      </ListItem>
    </List>
    <Divider />
  </>
);
