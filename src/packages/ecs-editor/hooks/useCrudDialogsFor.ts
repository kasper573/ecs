import { Dispatch } from "react";
import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import {
  EditorActions,
  EditorObjectCreateAction,
  EditorObjectDeleteAction,
  EditorObjectRenameAction,
} from "../types/EditorActions";
import { createObjectActionType } from "../types/EditorObjectAction";
import { useCrudDialogs } from "./useCrudDialogs";

/**
 * Convenience wrapper for `useCrudDialogs.ts`.
 * Provides the same functionality but needs less parameters.
 */
export const useCrudDialogsFor = <ObjectName extends EditorObjectName>(
  objectName: ObjectName,
  dispatch: Dispatch<EditorActions>
) =>
  useCrudDialogs<EditorObjects[ObjectName]>({
    createDialogTitle: `Add ${objectName}`,
    getItemName: (item) => (item ? item.name : ""),
    onCreateItem: (name) =>
      dispatch({
        type: createObjectActionType(objectName, "create"),
        name,
      } as EditorObjectCreateAction<Fixed>),
    onRenameItem: (obj, name) =>
      dispatch({
        type: createObjectActionType(objectName, "rename"),
        [objectName as Fixed]: obj!,
        name,
      } as EditorObjectRenameAction<Fixed>),
    onDeleteItem: (obj) =>
      dispatch({
        type: createObjectActionType(objectName, "delete"),
        [objectName as Fixed]: obj,
      } as EditorObjectDeleteAction<Fixed>),
  });

// HACK dispatch doesn't play well with dispatching generic type data,
// so we pretend to be dispatching a fixed type to make typescript happy.
// We correct the specific type anyway with useCrudDialogs<EditorObjects[ObjectName]>
type Fixed = "system";
