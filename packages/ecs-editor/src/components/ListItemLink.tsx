import { ListItem } from "@material-ui/core";
import { ComponentProps } from "react";
import { Link, LinkProps } from "./Link";

export type ListItemLinkProps = Omit<LinkProps, "onClick"> &
  Omit<ComponentProps<typeof ListItem>, "button">;

/**
 * Application specific convention for rendering links.
 * Will use the design of material-ui/ListItem component, while using the app Link component internally
 */
export const ListItemLink = (props: ListItemLinkProps) => (
  // Passing in Link as any to avoid having to refactor this component with generic arguments
  <ListItem component={Link as any} {...props} />
);
