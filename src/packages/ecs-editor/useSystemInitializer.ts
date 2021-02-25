import { useEffect, useReducer, useState } from "react";
import { System } from "../ecs/System";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { initializeSystem } from "./initializeSystem";
import { EditorObjects } from "./types/EditorObjects";

export const useSystemInitializer = (selected: EditorObjects) => {
  const [system, setSystem] = useState<System>();
  const [, refresh] = useReducer((n) => n + 1, 0);

  const resetSystem = () => {
    if (selected.system) {
      setSystem(initializeSystem(selected.system));
    }
  };

  const gotoSelectedScene = () => {
    const sm = system?.modules.findType(SceneManager);
    const newSceneId = selected.scene?.name;
    const didSceneChange = newSceneId !== sm?.sceneId;
    if (didSceneChange && sm && system) {
      sm.sceneId = newSceneId;
      system.update();
      refresh();
    }
  };

  useEffect(resetSystem, [selected.system]);
  useEffect(gotoSelectedScene, [selected.scene, system]);

  return [system, resetSystem] as const;
};
