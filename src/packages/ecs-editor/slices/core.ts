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
    CREATE_SYSTEM_DEFINITION: createSystemDefinitionReducer,
    RENAME_SYSTEM_DEFINITION: renameSystemDefinitionReducer,
    DELETE_SYSTEM_DEFINITION: deleteSystemDefinitionReducer,
    SELECT_SYSTEM_DEFINITION: selectSystemDefinitionReducer,
    CREATE_SCENE_DEFINITION: createSceneDefinitionReducer,
    RENAME_SCENE_DEFINITION: renameSceneDefinitionReducer,
    DELETE_SCENE_DEFINITION: deleteSceneDefinitionReducer,
    SELECT_SCENE_DEFINITION: selectSceneDefinitionReducer,
    CREATE_ENTITY_INITIALIZER: createEntityInitializerReducer,
    UPDATE_ENTITY_INITIALIZER: updateEntityInitializerReducer,
    DELETE_ENTITY_INITIALIZER: deleteEntityInitializerReducer,
    SELECT_ENTITY_INITIALIZER: selectEntityInitializerReducer,
    CREATE_LIBRARY_NODE: createLibraryNodeReducer,
    UPDATE_LIBRARY_NODE: updateLibraryNodeReducer,
    DELETE_LIBRARY_NODE: deleteLibraryNodeReducer,
    SELECT_LIBRARY_NODE: selectLibraryNodeReducer,
  },
});
