import { memo } from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { SystemSyncContext, useSystemSync } from "../../hooks/useSystemSync";
import { ContentPadding } from "../../layout/ContentPadding";
import { SystemActions } from "./SystemActions";
import { PanelContainer } from "./PanelContainer";
import { LibraryPanel } from "./LibraryPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { InspectorPanel } from "./InspectorPanel";
import { RuntimePanel } from "./RuntimePanel";

export const EditorView = memo(() => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systemSync = useSystemSync();
  return (
    <SystemSyncContext.Provider value={systemSync}>
      <AdjustedContentPadding>
        {selectedSystem && <SystemActions system={selectedSystem} />}
        <PanelContainer>
          <LibraryPanel />
          <HierarchyPanel />
          <InspectorPanel />
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
