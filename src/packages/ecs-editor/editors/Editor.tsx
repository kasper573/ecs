import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { PanelContainer } from "../components/PanelContainer";
import { AppBarAndDrawer } from "../components/AppBarAndDrawer";
import { AppBar } from "../components/AppBar";
import { RuntimePanel } from "../panels/RuntimePanel";
import { ScenesPanel } from "../panels/ScenesPanel";
import { LibraryPanel } from "../panels/LibraryPanel";
import { SystemsPanel } from "../panels/SystemsPanel";
import { InstancesPanel } from "../panels/InstancesPanel";
import { InspectorPanel } from "../panels/InspectorPanel";
import { Hotkeys } from "../components/Hotkeys";
import { useSelector } from "../store";
import { lightTheme } from "../fixtures/lightTheme";
import { darkTheme } from "../fixtures/darkTheme";
import { selectThemeType } from "../selectors/selectThemeType";

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
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <AppBarAndDrawer appBar={<AppBar />} drawer={<SystemsPanel />}>
          <PanelContainer>
            <RuntimePanel />
            <ScenesPanel />
            <InspectorPanel />
            <InstancesPanel />
            <LibraryPanel />
          </PanelContainer>
          <Hotkeys />
        </AppBarAndDrawer>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
