import React, { MouseEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Container, ContainerProps } from "@material-ui/core";
import styled, { CSSObject } from "styled-components";
import { Toolbar, ToolbarProps } from "./Toolbar";

export type LayoutProps = {
  children: ContainerProps["children"];
} & ToolbarProps;

export const Layout = ({ children, ...toolbarProps }: LayoutProps) => (
  <Root>
    <AppBar position="fixed">
      <AppBarContainer>
        <Toolbar {...toolbarProps} />
      </AppBarContainer>
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
