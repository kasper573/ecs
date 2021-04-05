import React, { MouseEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Container, ContainerProps } from "@material-ui/core";
import styled, { CSSObject } from "styled-components";
import { AppBarContent } from "./AppBarContent";
import { SystemHeader } from "./SystemHeader";

export type LayoutProps = {
  children: ContainerProps["children"];
};

/**
 * A layout component that wraps children in a responsive container that always has an AppBar and Drawer.
 * On desktop the drawer is permanent and on mobile it is toggled.
 */
export const Layout = ({ children }: LayoutProps) => (
  <Root>
    <AppBar position="fixed">
      <AppBarContainer>
        <AppBarContent />
      </AppBarContainer>
    </AppBar>
    <Content>
      <ToolbarSpacing />
      <SystemHeader />
      {children}
    </Content>
  </Root>
);

const Root = styled.div.attrs({ onContextMenu: disableContextMenu })`
  display: flex;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 100%; // Fixes container size to trigger overflows
  },
`;

const AppBarContainer = styled(Container)`
  padding-top: 0;
  padding-bottom: 0;
`;

const ToolbarSpacing = styled.div(({ theme }) => ({
  ...(theme.mixins.toolbar as CSSObject),
  padding: theme.spacing(2),
}));

const Content = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding-bottom: ${({ theme }) => theme.spacing(8 + 1)}px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;

// Disable any unhandled context menus
function disableContextMenu(e: MouseEvent) {
  e.preventDefault();
}
