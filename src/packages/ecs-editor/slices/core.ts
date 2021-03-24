import { createSlice } from "@reduxjs/toolkit";
import { createEditorState } from "../functions/createEditorState";
import { createSystemDefinition } from "../reducers/createSystemDefinition";
import { renameSystemDefinition } from "../reducers/renameSystemDefinition";
import { deleteSystemDefinition } from "../reducers/deleteSystemDefinition";
import { selectSystemDefinition } from "../reducers/selectSystemDefinition";
import { createSceneDefinition } from "../reducers/createSceneDefinition";
import { renameSceneDefinition } from "../reducers/renameSceneDefinition";
import { deleteSceneDefinition } from "../reducers/deleteSceneDefinition";
import { selectSceneDefinition } from "../reducers/selectSceneDefinition";
import { createEntityInitializer } from "../reducers/createEntityInitializer";
import { updateEntityInitializer } from "../reducers/updateEntityInitializer";
import { deleteEntityInitializer } from "../reducers/deleteEntityInitializer";
import { selectEntityInitializer } from "../reducers/selectEntityInitializer";
import { createLibraryNode } from "../reducers/createLibraryNode";
import { updateLibraryNode } from "../reducers/updateLibraryNode";
import { deleteLibraryNode } from "../reducers/deleteLibraryNode";
import { selectLibraryNode } from "../reducers/selectLibraryNode";

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
    selectSystemDefinition,
    createSceneDefinition,
    renameSceneDefinition,
    deleteSceneDefinition,
    selectSceneDefinition,
    createEntityInitializer,
    updateEntityInitializer,
    deleteEntityInitializer,
    selectEntityInitializer,
    createLibraryNode,
    updateLibraryNode,
    deleteLibraryNode,
    selectLibraryNode,
  },
});
