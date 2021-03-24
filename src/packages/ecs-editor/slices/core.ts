import { createSlice } from "@reduxjs/toolkit";
import { createEditorState } from "../functions/createEditorState";
import { createSystemReducer } from "../reducers/createSystemReducer";
import { updateSystemReducer } from "../reducers/updateSystemReducer";
import { deleteSystemReducer } from "../reducers/deleteSystemReducer";
import { selectSystemReducer } from "../reducers/selectSystemReducer";
import { createSceneReducer } from "../reducers/createSceneReducer";
import { updateSceneReducer } from "../reducers/updateSceneReducer";
import { deleteSceneReducer } from "../reducers/deleteSceneReducer";
import { selectSceneReducer } from "../reducers/selectSceneReducer";
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
    CREATE_SYSTEM: createSystemReducer,
    UPDATE_SYSTEM: updateSystemReducer,
    DELETE_SYSTEM: deleteSystemReducer,
    SELECT_SYSTEM: selectSystemReducer,
    CREATE_SCENE: createSceneReducer,
    UPDATE_SCENE: updateSceneReducer,
    DELETE_SCENE: deleteSceneReducer,
    SELECT_SCENE: selectSceneReducer,
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
