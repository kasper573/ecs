import { memo } from "react";
import styled from "styled-components";
import { useRootSelector } from "../../store";
import { selectSelectedSystemDefinition } from "../../selectors/selectSelectedSystemDefinition";
import { SystemSyncContext, useSystemSync } from "../../hooks/useSystemSync";
import { ContentPadding } from "../../layout/ContentPadding";
import { NotFoundView } from "../NotFoundView";
import { WindowRenderer } from "../../features/window/WindowRenderer";
import { WindowDefinitionContext } from "../../features/window/WindowDefinitionContext";
import { WindowId } from "../../features/window/WindowId";
import { WindowDefinition } from "../../features/window/WindowDefinition";
import { SystemActions } from "./SystemActions";
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
        <WindowDefinitionContext.Provider value={editorWindows}>
          <SystemActions system={selectedSystem} />
          <WindowRenderer />
        </WindowDefinitionContext.Provider>
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

const editorWindows: WindowDefinition[] = [
  { id: "library" as WindowId, title: "Library", content: <LibraryPanel /> },
  { id: "code" as WindowId, title: "Code", content: <CodePanel /> },
  { id: "runtime" as WindowId, title: "Runtime", content: <RuntimePanel /> },
  {
    id: "hierarchy" as WindowId,
    title: "Hierarchy",
    content: <HierarchyPanel />,
  },
  {
    id: "inspector" as WindowId,
    title: "Inspector",
    content: <InspectorPanel />,
  },
];
