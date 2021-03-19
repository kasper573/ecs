import { ListItemSecondaryAction } from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { OpaqueListSubheader } from "./OpaqueListSubheader";

export const PanelHeader = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <OpaqueListSubheader>
    {title}
    <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
  </OpaqueListSubheader>
);
