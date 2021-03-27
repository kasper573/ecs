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
import { renameLibraryNode } from "./reducers/renameLibraryNode";
import { deleteComponentInitializer } from "./reducers/deleteComponentInitializer";
import { deleteEntityDefinition } from "./reducers/deleteEntityDefinition";
import { addComponentInitializer } from "./reducers/addComponentInitializer";
import { updateComponentProperties } from "./reducers/updateComponentProperties";
import { deleteLibraryFolder } from "./reducers/deleteLibraryFolder";
import { deleteComponentDefinition } from "./reducers/deleteComponentDefinition";
import { setEditorState } from "./reducers/setEditorState";

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
    deleteSceneDefinition,
    createEntityInitializer,
    renameEntityInitializer,
    deleteEntityInitializer,
    setSelectedSystemDefinition,
    setSelectedSceneDefinition,
    setSelectedEntityInitializer,
    setSelectedLibraryNode,
    createEntityDefinition,
    deleteEntityDefinition,
    deleteLibraryFolder,
    renameLibraryNode,
    deleteComponentDefinition,
    addComponentInitializer,
    updateComponentProperties,
    deleteComponentInitializer,
    setEditorState,
  },
});
