import { memo } from "react";
import styled from "styled-components";
import { useRootSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { SystemSyncContext, useSystemSync } from "../../hooks/useSystemSync";
import { ContentPadding } from "../../layout/ContentPadding";
import { NotFoundView } from "../NotFoundView";
import { SystemActions } from "./SystemActions";
import { PanelContainer } from "./PanelContainer";
import { LibraryPanel } from "./LibraryPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { InspectorPanel } from "./InspectorPanel";
import { CodePanel } from "./CodePanel";
import { RuntimePanel } from "./RuntimePanel";

export const EditorView = memo(() => {
  const selectedSystem = useRootSelector(selectSelectedSystemDefinition);
  const systemSync = useSystemSync();
  if (!selectedSystem) {
    return <NotFoundView />;
  }
  return (
    <SystemSyncContext.Provider value={systemSync}>
      <AdjustedContentPadding>
        <SystemActions system={selectedSystem} />
        <PanelContainer>
          <LibraryPanel />
          <HierarchyPanel />
          <InspectorPanel />
          <CodePanel />
          <RuntimePanel />
        </PanelContainer>
      </AdjustedContentPadding>
    </SystemSyncContext.Provider>
  );
});

const AdjustedContentPadding = styled(ContentPadding)`
  padding-top: 0; // The height of SystemHeader already acts as top padding
  ${({ theme }) => theme.breakpoints.up("sm")} {
    // On large displays align bottom padding with the height of SystemHeading
    padding-bottom: ${({ theme }) => theme.spacing(8 + 1)}px;
  }
`;
