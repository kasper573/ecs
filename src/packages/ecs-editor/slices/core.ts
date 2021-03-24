import { createSlice } from "@reduxjs/toolkit";
import { createEditorState } from "../functions/createEditorState";
import { createSystemDefinitionReducer } from "../reducers/createSystemDefinitionReducer";
import { renameSystemDefinitionReducer } from "../reducers/renameSystemDefinitionReducer";
import { deleteSystemDefinitionReducer } from "../reducers/deleteSystemDefinitionReducer";
import { selectSystemDefinitionReducer } from "../reducers/selectSystemDefinitionReducer";
import { createSceneDefinitionReducer } from "../reducers/createSceneDefinitionReducer";
import { renameSceneDefinitionReducer } from "../reducers/renameSceneDefinitionReducer";
import { deleteSceneDefinitionReducer } from "../reducers/deleteSceneDefinitionReducer";
import { selectSceneDefinitionReducer } from "../reducers/selectSceneDefinitionReducer";
import { createEntityInitializerReducer } from "../reducers/createEntityInitializerReducer";
import { updateEntityInitializerReducer } from "../reducers/updateEntityInitializerReducer";
import { deleteEntityInitializerReducer } from "../reducers/deleteEntityInitializerReducer";
import { selectEntityInitializerReducer } from "../reducers/selectEntityInitializerReducer";
import { createLibraryNodeReducer } from "../reducers/createLibraryNodeReducer";
import { updateLibraryNodeReducer } from "../reducers/updateLibraryNodeReducer";
import { deleteLibraryNodeReducer } from "../reducers/deleteLibraryNodeReducer";
import { selectLibraryNodeReducer } from "../reducers/selectLibraryNodeReducer";

/**
 * A redux toolkit slice representing all actions in the editor
 */
export const core = createSlice({
  initialState: createEditorState(),
  name: "core",
  reducers: {
    createSystemDefinition: createSystemDefinitionReducer,
    renameSystemDefinition: renameSystemDefinitionReducer,
    deleteSystemDefinition: deleteSystemDefinitionReducer,
    selectSystemDefinition: selectSystemDefinitionReducer,
    createSceneDefinition: createSceneDefinitionReducer,
    renameSceneDefinition: renameSceneDefinitionReducer,
    deleteSceneDefinition: deleteSceneDefinitionReducer,
    selectSceneDefinition: selectSceneDefinitionReducer,
    createEntityInitializer: createEntityInitializerReducer,
    updateEntityInitializer: updateEntityInitializerReducer,
    deleteEntityInitializer: deleteEntityInitializerReducer,
    selectEntityInitializer: selectEntityInitializerReducer,
    createLibraryNode: createLibraryNodeReducer,
    updateLibraryNode: updateLibraryNodeReducer,
    deleteLibraryNode: deleteLibraryNodeReducer,
    selectLibraryNode: selectLibraryNodeReducer,
  },
});
