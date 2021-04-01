import React, { useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { PanelContainer } from "../components/PanelContainer";
import { AppBarAndDrawer } from "../components/AppBarAndDrawer";
import { RuntimePanel } from "../panels/RuntimePanel";
import { LibraryPanel } from "../panels/LibraryPanel";
import { InstancesPanel } from "../panels/InstancesPanel";
import { InspectorPanel } from "../panels/InspectorPanel";
import { Hotkeys } from "../components/Hotkeys";
import { useSelector } from "../store";
import { lightTheme } from "../fixtures/lightTheme";
import { darkTheme } from "../fixtures/darkTheme";
import { selectThemeType } from "../selectors/selectThemeType";
import { GlobalStyle } from "../components/GlobalStyle";
import { DragLayer } from "../components/DragLayer";
import { Dialogs } from "../hooks/useDialog";

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
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
        <AppBarAndDrawer>
          <PanelContainer>
            <RuntimePanel />
            <InspectorPanel />
            <InstancesPanel />
            <LibraryPanel />
          </PanelContainer>
          <Hotkeys />
        </AppBarAndDrawer>
        <DragLayer />
        <Dialogs />
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};
