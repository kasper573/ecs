import { ListItemSecondaryAction } from "@material-ui/core";
import React, { PropsWithChildren, ReactNode } from "react";
import { OpaqueListSubheader } from "./OpaqueListSubheader";

export type PanelHeaderProps = PropsWithChildren<{ title: ReactNode }>;

export const PanelHeader = ({ title, children }: PanelHeaderProps) => (
  <OpaqueListSubheader>
    {title}
    <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
  </OpaqueListSubheader>
);
