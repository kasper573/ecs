import React from "react";
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

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
 */
export const Editor = () => (
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
);
