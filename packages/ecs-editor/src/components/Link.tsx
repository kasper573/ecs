import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@material-ui/core";
import styled from "styled-components";

export type LinkProps = MuiLinkProps & Pick<RouterLinkProps, "to">;

/**
 * Application specific convention for rendering links.
 * Will use the design of material-ui/Link component, while using react-router-dom/Link component internally
 */
export const Link = React.forwardRef<HTMLSpanElement, LinkProps>(
  (props, ref) => (
    <StyledLink
      ref={ref}
      {...props}
      // Passing in RouterLink as any to avoid having to refactor this component with generic arguments
      {...({ component: RouterLink } as unknown)}
    />
  )
);

const StyledLink = styled(MuiLink)`
  // Use default text color for links
  color: inherit;
`;
