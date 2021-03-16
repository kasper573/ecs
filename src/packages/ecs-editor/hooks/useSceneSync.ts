import { Dispatch, useEffect, useReducer } from "react";
import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { EditorActions } from "../types/EditorActions";
import { useSystemUpdate } from "../../ecs-react/useSystemUpdate";
import { EditorSelectionObjects } from "../types/EditorSelection";

/**
 * Synchronizes scene selection in Editor and System state.
 * (Updates Editor scene selection whenever the scene changes in the specified system and vice versa)
 */
export const useSceneSync = (
  system: System | undefined,
  selected: Partial<EditorSelectionObjects>,
  dispatch: Dispatch<EditorActions>
) => {
  const [, refresh] = useReducer((n) => n + 1, 0);

  const updateSystemSceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const newSceneId = selected.scene?.name;
    const didSceneChange = newSceneId !== sm?.sceneId;
    if (didSceneChange && sm && system) {
      sm.sceneId = newSceneId;
      system.update();
      refresh();
    }
  };

  const updateUISceneSelection = () => {
    const sm = system?.modules.findType(SceneManager);
    const editorSceneId = selected.scene?.name;
    const systemSceneId = sm?.sceneId;
    const didSceneChange = editorSceneId !== systemSceneId;
    const scene = selected.system?.scenes.find(
      (scene) => scene.name === systemSceneId
    );
    if (didSceneChange && scene) {
      dispatch({ type: "SELECT_SCENE", payload: scene });
    }
  };

  useEffect(updateSystemSceneSelection, [selected.scene, system]);
  useSystemUpdate(system, updateUISceneSelection);
};
