import { createSlice } from "@reduxjs/toolkit";
import { createEditorState } from "./functions/createEditorState";
import { createSystemDefinition } from "./reducers/createSystemDefinition";
import { renameSystemDefinition } from "./reducers/renameSystemDefinition";
import { deleteSystemDefinition } from "./reducers/deleteSystemDefinition";
import { setSelectedSystemDefinition } from "./reducers/setSelectedSystemDefinition";
import { createSceneDefinition } from "./reducers/createSceneDefinition";
import { renameSceneDefinition } from "./reducers/renameSceneDefinition";
import { deleteSceneDefinition } from "./reducers/deleteSceneDefinition";
import { setSelectedSceneDefinition } from "./reducers/setSelectedSceneDefinition";
import { createEntityInitializer } from "./reducers/createEntityInitializer";
import { renameEntityInitializer } from "./reducers/renameEntityInitializer";
import { deleteEntityInitializer } from "./reducers/deleteEntityInitializer";
import { setSelectedEntityInitializer } from "./reducers/setSelectedEntityInitializer";
import { createEntityDefinition } from "./reducers/createEntityDefinition";
import { setSelectedLibraryNode } from "./reducers/setSelectedLibraryNode";
import { deleteComponentInitializer } from "./reducers/deleteComponentInitializer";
import { deleteEntityDefinition } from "./reducers/deleteEntityDefinition";
import { addComponentInitializer } from "./reducers/addComponentInitializer";
import { setComponentInitializerProperty } from "./reducers/setComponentInitializerProperty";
import { deleteLibraryFolder } from "./reducers/deleteLibraryFolder";
import { deleteComponentDefinition } from "./reducers/deleteComponentDefinition";
import { setEditorState } from "./reducers/setEditorState";
import { ensureSelection } from "./reducers/ensureSelection";
import { createComponentDefinition } from "./reducers/createComponentDefinition";
import { renameComponentDefinition } from "./reducers/renameComponentDefinition";
import { renameEntityDefinition } from "./reducers/renameEntityDefinition";
import { renameLibraryFolder } from "./reducers/renameLibraryFolder";
import { duplicateEntityInitializer } from "./reducers/duplicateEntityInitializer";
import { duplicateSceneDefinition } from "./reducers/duplicateSceneDefinition";
import { duplicateEntityDefinition } from "./reducers/duplicateEntityDefinition";
import { duplicateComponentDefinition } from "./reducers/duplicateComponentDefinition";
import { duplicateComponentInitializer } from "./reducers/duplicateComponentInitializer";
import { createLibraryFolder } from "./reducers/createLibraryFolder";
import { setThemeType } from "./reducers/setThemeType";
import { moveLibraryNode } from "./reducers/moveLibraryNode";
import { resetComponentInitializerProperty } from "./reducers/resetComponentInitializerProperty";

/**
 * A redux toolkit slice representing all actions in the editor
 */
export const core = createSlice({
  initialState: createEditorState(),
  name: "core",
  reducers: {
    createSystemDefinition,
    renameSystemDefinition,
    deleteSystemDefinition,
    createSceneDefinition,
    renameSceneDefinition,
    duplicateSceneDefinition,
    deleteSceneDefinition,
    createEntityInitializer,
    renameEntityInitializer,
    duplicateEntityInitializer,
    deleteEntityInitializer,
    setSelectedSystemDefinition,
    setSelectedSceneDefinition,
    setSelectedEntityInitializer,
    setSelectedLibraryNode,
    moveLibraryNode,
    createEntityDefinition,
    renameEntityDefinition,
    duplicateEntityDefinition,
    deleteEntityDefinition,
    createLibraryFolder,
    renameLibraryFolder,
    deleteLibraryFolder,
    renameComponentDefinition,
    deleteComponentDefinition,
    addComponentInitializer,
    setComponentInitializerProperty,
    resetComponentInitializerProperty,
    deleteComponentInitializer,
    duplicateComponentInitializer,
    createComponentDefinition,
    duplicateComponentDefinition,
    setEditorState,
    setThemeType,
  },
  extraReducers: (builder) => builder.addMatcher(() => true, ensureSelection),
});

export const noUndoActions = ([
  "setSelectedEntityInitializer",
  "setSelectedLibraryNode",
  "setSelectedSceneDefinition",
  "setSelectedSystemDefinition",
  "setThemeType",
] as Array<keyof typeof core.actions>).map((name) => `${core.name}/${name}`);
