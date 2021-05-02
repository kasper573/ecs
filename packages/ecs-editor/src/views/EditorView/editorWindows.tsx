import { MenuItem } from "@material-ui/core";
import { Dispatch } from "redux";
import { typedKeys } from "../../../../ecs-common/src/typedKeys";
import { WindowId } from "../../features/window/WindowId";
import { WindowState } from "../../features/window/WindowState";
import { getOpenWindows } from "../../features/window/getOpenWindows";
import { core } from "../../core";
import { isWindowOpen } from "../../features/window/isWindowOpen";
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
  {} as Record<keyof typeof editorWindows, WindowId>
);

export const createToggleWindowMenuItems = (
  root: WindowState,
  dispatch: Dispatch
) => {
  const open = getOpenWindows(root);
  return typedKeys(editorWindows).map((name) => {
    const id = name as WindowId;
    const toggleAction = isWindowOpen(root, id)
      ? core.actions.closeWindow(id)
      : core.actions.openWindow(id);
    return (
      <MenuItem
        key={name}
        selected={open.includes(id)}
        onClick={() => dispatch(toggleAction)}
      >
        {editorWindows[name].title}
      </MenuItem>
    );
  });
};
