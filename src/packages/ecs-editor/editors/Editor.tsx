import React, { useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Layout } from "../layout/Layout";
import { Hotkeys } from "../components/Hotkeys";
import { useSelector } from "../store";
import { lightTheme } from "../fixtures/lightTheme";
import { darkTheme } from "../fixtures/darkTheme";
import { selectThemeType } from "../selectors/selectThemeType";
import { GlobalStyle } from "../layout/GlobalStyle";
import { DragLayer } from "../dnd/DragLayer";
import { Dialogs } from "../hooks/useDialog";
import { AppBarContent } from "../layout/AppBarContent";
import { Content } from "../layout/Content";

/**
 * Renders controls to CRUD systems, entities, components and properties.
 */
export const Editor = () => {
  const themeType = useSelector(selectThemeType);
  const theme = useMemo(
    () => createMuiTheme(themeType === "light" ? lightTheme : darkTheme),
    [themeType]
  );
  return (
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Layout appBar={<AppBarContent />}>
          <Content />
        </Layout>
        <DragLayer />
        <Dialogs />
        <Hotkeys />
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};
