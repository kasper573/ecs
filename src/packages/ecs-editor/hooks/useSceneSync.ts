import { useEffect, useReducer } from "react";
import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { useSystemUpdate } from "../../ecs-react/useSystemUpdate";
import { useDispatch, useSelector, useStore } from "../store";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { core } from "../slices/core";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";

/**
 * Synchronizes scene selection in Editor and System state.
 * (Updates Editor scene selection whenever the scene changes in the specified system and vice versa)
 */
export const useSceneSync = (system: System | undefined) => {
  const [, refresh] = useReducer((n) => n + 1, 0);
  const dispatch = useDispatch();
  const editorSceneId = useSelector(selectSelectedSceneDefinition)?.id;
  const store = useStore();

  const updateSystemSceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const didSceneChange = editorSceneId !== sm?.sceneId;
    if (didSceneChange && sm && system) {
      sm.sceneId = editorSceneId;
      system.update();
      refresh();
    }
  };

  const updateEditorSceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const systemSceneId: SceneDefinitionId = sm?.sceneId;
    const editorSceneId = store.getState().present.selection.scene;
    const didSceneChange = editorSceneId !== systemSceneId;
    if (didSceneChange) {
      dispatch(core.actions.setSelectedSceneDefinition(systemSceneId));
    }
  };

  useEffect(updateSystemSceneSelection, [editorSceneId, system]);
  useSystemUpdate(system, updateEditorSceneSelection);
};
