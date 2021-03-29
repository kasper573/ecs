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
import { updateComponentProperties } from "./reducers/updateComponentProperties";
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
    createEntityDefinition,
    renameEntityDefinition,
    deleteEntityDefinition,
    renameLibraryFolder,
    deleteLibraryFolder,
    renameComponentDefinition,
    deleteComponentDefinition,
    addComponentInitializer,
    updateComponentProperties,
    deleteComponentInitializer,
    createComponentDefinition,
    setEditorState,
  },
  extraReducers: (builder) => builder.addMatcher(() => true, ensureSelection),
});
