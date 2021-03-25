import { useEffect, useReducer } from "react";
import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { useSystemUpdate } from "../../ecs-react/useSystemUpdate";
import { useDispatch, useSelector } from "../store";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";
import { core } from "../slices/core";
import { selectSelectedScene } from "../selectors/selectSelectedScene";

/**
 * Synchronizes scene selection in Editor and System state.
 * (Updates Editor scene selection whenever the scene changes in the specified system and vice versa)
 */
export const useSceneSync = (system: System | undefined) => {
  const [, refresh] = useReducer((n) => n + 1, 0);
  const dispatch = useDispatch();
  const editorSceneId = useSelector(selectSelectedScene)?.id;

  const updateSystemSceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const didSceneChange = editorSceneId !== sm?.sceneId;
    if (didSceneChange && sm && system) {
      sm.sceneId = editorSceneId;
      system.update();
      refresh();
    }
  };

  const updateUISceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const systemSceneId: SceneDefinitionId = sm?.sceneId;
    const didSceneChange = editorSceneId !== systemSceneId;
    if (didSceneChange) {
      dispatch(core.actions.selectSceneDefinition(systemSceneId));
    }
  };

  useEffect(updateSystemSceneSelection, [editorSceneId, system]);
  useSystemUpdate(system, updateUISceneSelection);
};
