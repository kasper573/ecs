import React, { MouseEvent, ReactElement } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Container, ContainerProps } from "@material-ui/core";
import styled, { CSSObject } from "styled-components";

export type LayoutProps = {
  appBar: ReactElement;
  children: ContainerProps["children"];
};

/**
 * A layout component that wraps children in a responsive container that always has an AppBar and Drawer.
 * On desktop the drawer is permanent and on mobile it is toggled.
 */
export const Layout = ({ children, appBar }: LayoutProps) => (
  <Root>
    <AppBar position="fixed">
      <AppBarContainer>{appBar}</AppBarContainer>
    </AppBar>
    <Content>
      <ToolbarSpacing />
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
`;

// Disable any unhandled context menus
function disableContextMenu(e: MouseEvent) {
  e.preventDefault();
}
