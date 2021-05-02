import { memo } from "react";
import styled from "styled-components";
import { useRootSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { SystemSyncContext, useSystemSync } from "../../hooks/useSystemSync";
import { ContentPadding } from "../../layout/ContentPadding";
import { NotFoundView } from "../NotFoundView";
import { WindowContainer } from "../../features/window/WindowContainer";
import { SystemActions } from "./SystemActions";
import { LibraryPanel } from "./LibraryPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { InspectorPanel } from "./InspectorPanel";
import { CodePanel } from "./CodePanel";
import { RuntimePanel } from "./RuntimePanel";

const windows = {
  library: { title: "Library", content: <LibraryPanel /> },
  hierarchy: { title: "Hierarchy", content: <HierarchyPanel /> },
  inspector: { title: "Inspector", content: <InspectorPanel /> },
  code: { title: "Code", content: <CodePanel /> },
  runtime: { title: "Runtime", content: <RuntimePanel /> },
};

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
        <WindowContainer windowDefinitions={windows} />
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
