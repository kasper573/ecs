import React, { useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Layout } from "./layout/Layout";
import { Hotkeys } from "./components/Hotkeys";
import { useSelector } from "./store";
import { lightTheme } from "./fixtures/lightTheme";
import { darkTheme } from "./fixtures/darkTheme";
import { selectThemeType } from "./selectors/selectThemeType";
import { GlobalStyle } from "./layout/GlobalStyle";
import { DragLayer } from "./dnd/DragLayer";
import { Dialogs } from "./hooks/useDialog";
import { Toolbar } from "./layout/Toolbar";
import { Routes } from "./layout/Routes";
import { IntroProvider } from "./intro/IntroProvider";
import { IntroDimmer } from "./intro/IntroDimmer";

/**
 * Renders controls to CRUD systems, entities, components and properties.
 */
export const App = () => {
  const themeType = useSelector(selectThemeType);
  const theme = useMemo(
    () => createMuiTheme(themeType === "light" ? lightTheme : darkTheme),
    [themeType]
  );
  return (
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <IntroProvider>
          <CssBaseline />
          <GlobalStyle />
          <Layout appBar={<Toolbar />}>
            <Routes />
          </Layout>
          <DragLayer />
          <Dialogs />
          <Hotkeys />
          <IntroDimmer />
        </IntroProvider>
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};
