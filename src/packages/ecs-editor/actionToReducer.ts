import { createSystemReducer } from "./reducers/createSystemReducer";
import { updateSystemReducer } from "./reducers/updateSystemReducer";
import { deleteSystemReducer } from "./reducers/deleteSystemReducer";
import { selectSystemReducer } from "./reducers/selectSystemReducer";
import { createSceneReducer } from "./reducers/createSceneReducer";
import { updateSceneReducer } from "./reducers/updateSceneReducer";
import { deleteSceneReducer } from "./reducers/deleteSceneReducer";
import { selectSceneReducer } from "./reducers/selectSceneReducer";
import { createEntityInitializerReducer } from "./reducers/createEntityInitializerReducer";
import { updateEntityInitializerReducer } from "./reducers/updateEntityInitializerReducer";
import { deleteEntityInitializerReducer } from "./reducers/deleteEntityInitializerReducer";
import { selectEntityInitializerReducer } from "./reducers/selectEntityInitializerReducer";
import { createEntityDefinitionReducer } from "./reducers/createEntityDefinitionReducer";
import { updateEntityDefinitionReducer } from "./reducers/updateEntityDefinitionReducer";
import { deleteEntityDefinitionReducer } from "./reducers/deleteEntityDefinitionReducer";
import { selectEntityDefinitionReducer } from "./reducers/selectEntityDefinitionReducer";
import { selectComponentDefinitionReducer } from "./reducers/selectComponentDefinitionReducer";
import { updateStateReducer } from "./reducers/updateStateReducer";

/**
 * All reducers specified here will be available as actions that can
 * be dispatched to the root reducer (see rootReducer.ts).
 *
 * Example:
 * const [state, dispatch] = useReducer(rootReducer);
 * const updateSystem = () => dispatch({type: UPDATE_SYSTEM: payload: {...}})
 */
export const actionToReducer = {
  UPDATE_STATE: updateStateReducer,
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
  CREATE_ENTITY_DEFINITION: createEntityDefinitionReducer,
  UPDATE_ENTITY_DEFINITION: updateEntityDefinitionReducer,
  DELETE_ENTITY_DEFINITION: deleteEntityDefinitionReducer,
  SELECT_ENTITY_DEFINITION: selectEntityDefinitionReducer,
  SELECT_COMPONENT_DEFINITION: selectComponentDefinitionReducer,
};

export type ActionToReducer = typeof actionToReducer;
