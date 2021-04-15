import { memo } from "react";
import { useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { SystemSyncContext, useSystemSync } from "../hooks/useSystemSync";
import { SystemHeader } from "./SystemHeader";
import { PanelContainer } from "./PanelContainer";
import { LibraryPanel } from "./LibraryPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { InspectorPanel } from "./InspectorPanel";
import { RuntimePanel } from "./RuntimePanel";

export const Editor = memo(() => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systemSync = useSystemSync();
  return (
    <SystemSyncContext.Provider value={systemSync}>
      {selectedSystem && <SystemHeader system={selectedSystem} />}
      <PanelContainer>
        <LibraryPanel />
        <HierarchyPanel />
        <InspectorPanel />
        <RuntimePanel />
      </PanelContainer>
    </SystemSyncContext.Provider>
  );
});
