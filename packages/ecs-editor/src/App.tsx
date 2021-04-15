import React, { useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Hotkeys } from "./components/Hotkeys";
import { useSelector } from "./store";
import { lightTheme } from "./fixtures/lightTheme";
import { darkTheme } from "./fixtures/darkTheme";
import { selectThemeType } from "./selectors/selectThemeType";
import { GlobalStyle } from "./layout/GlobalStyle";
import { DragLayer } from "./dnd/DragLayer";
import { Dialogs } from "./hooks/useDialog";
import { IntroProvider } from "./intro/IntroProvider";
import { IntroDimmer } from "./intro/IntroDimmer";
import { Routes } from "./Routes";

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
          <Routes />
          <DragLayer />
          <Dialogs />
          <Hotkeys />
          <IntroDimmer />
        </IntroProvider>
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};
