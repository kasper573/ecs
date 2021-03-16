import { EditorState } from "../types/EditorState";
import { selectInspected } from "./selectInspected";
import { selectSelectedSystem } from "./selectSelectedSystem";
import { selectSelectedScene } from "./selectSelectedScene";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectSelectedObjects = (state: EditorState) => {
  // Resolve EditorSelectionValues into EditorSelectionObjects
  const system = selectSelectedSystem(state);
  const scene = selectSelectedScene(state, system);
  const inspected = selectInspected(state, system, scene);
  // Unpack InspectedObject into named properties for convenience
  const libraryNode =
    inspected?.type === "libraryNode" ? inspected.object : undefined;
  const entityInitializer =
    inspected?.type === "entityInitializer" ? inspected.object : undefined;
  return {
    system,
    scene,
    inspected,
    libraryNode,
    entityInitializer,
  };
};
