import { ReactNode } from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export type InspectedObjectInfoProps = {
  icon: ReactNode;
  name: ReactNode;
};

export const InspectedObjectInfo = ({
  icon,
  name,
}: InspectedObjectInfoProps) => (
  <>
    <Divider />
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
    <Divider />
  </>
);
