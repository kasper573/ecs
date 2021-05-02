//import { ListItemSecondaryAction } from "@material-ui/core";
import { PropsWithChildren, ReactNode } from "react";
//import { OpaqueListSubheader } from "./OpaqueListSubheader";

export type PanelHeaderProps = PropsWithChildren<{ title: ReactNode }>;

export const PanelHeader = ({ title, children }: PanelHeaderProps) => {
  return null;
  // return (
  //   <OpaqueListSubheader>
  //     {title}
  //     <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
  //   </OpaqueListSubheader>
  // )
};
