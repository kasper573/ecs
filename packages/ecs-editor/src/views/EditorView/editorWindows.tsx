import { typedKeys } from "../../../../ecs-common/src/typedKeys";
import { LibraryPanel } from "./LibraryPanel";
import { HierarchyPanel } from "./HierarchyPanel";
import { InspectorPanel } from "./InspectorPanel";
import { CodePanel } from "./CodePanel";
import { RuntimePanel } from "./RuntimePanel";

/**
 * Single source of truth of what windows can be rendered.
 * The WindowState will be referring to the keys of this object.
 */
export const editorWindows = {
  library: { title: "Library", content: <LibraryPanel /> },
  hierarchy: { title: "Hierarchy", content: <HierarchyPanel /> },
  inspector: { title: "Inspector", content: <InspectorPanel /> },
  code: { title: "Code", content: <CodePanel /> },
  runtime: { title: "Runtime", content: <RuntimePanel /> },
};

export const editorWindowNames = typedKeys(editorWindows).reduce(
  (names, name) => ({ ...names, [name]: name }),
  {} as Record<keyof typeof editorWindows, string>
);
