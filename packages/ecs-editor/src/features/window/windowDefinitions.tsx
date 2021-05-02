import { LibraryPanel } from "../../views/EditorView/LibraryPanel";
import { HierarchyPanel } from "../../views/EditorView/HierarchyPanel";
import { InspectorPanel } from "../../views/EditorView/InspectorPanel";
import { CodePanel } from "../../views/EditorView/CodePanel";
import { RuntimePanel } from "../../views/EditorView/RuntimePanel";

export const windowDefinitions = {
  library: { title: "Library", panel: <LibraryPanel /> },
  hierarchy: { title: "Hierarchy", panel: <HierarchyPanel /> },
  inspector: { title: "Inspector", panel: <InspectorPanel /> },
  code: { title: "Code", panel: <CodePanel /> },
  runtime: { title: "Runtime", panel: <RuntimePanel /> },
};
