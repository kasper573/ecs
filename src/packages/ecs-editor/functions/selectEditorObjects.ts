import { EditorObjects } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import { getEditorSelectionProperty } from "../types/EditorSelection";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectEditorObjects = ({
  systems,
  selection,
}: EditorState): Partial<EditorObjects> => {
  const system = findBy(
    systems,
    getEditorSelectionProperty("system"),
    selection.system
  );
  const scene = findBy(
    system?.scenes,
    getEditorSelectionProperty("scene"),
    selection.scene
  );
  const entityInitializer = findBy(
    scene?.entities,
    getEditorSelectionProperty("entityInitializer"),
    selection.entityInitializer
  );
  const libraryNode = findBy(
    system?.library,
    getEditorSelectionProperty("libraryNode"),
    selection.libraryNode
  );
  return {
    system,
    scene,
    entityInitializer,
    libraryNode,
  };
};

const findBy = <T, P extends keyof T>(
  list: T[] | undefined,
  property: P,
  value?: T[P]
) => {
  if (list === undefined || value === undefined) {
    return undefined;
  }
  return list.find((item) => item[property] === value);
};
