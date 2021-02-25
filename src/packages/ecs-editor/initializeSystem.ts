import { System } from "../ecs/System";
import { Inventory } from "../ecs-collectable/Inventory";
import { InteractionMemory } from "../ecs-interactive/InteractionMemory";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { Entity } from "../ecs/Entity";
import { Describable } from "../ecs-describable/Describable";
import { SerializedSystem } from "./types/SerializedSystem";
import { SerializedEntity } from "./types/SerializedEntity";

export const initializeSystem = (
  serializedSystem: SerializedSystem
): System => {
  const entriesByScene = getEntriesByScene(serializedSystem);
  const initialScene = Object.keys(entriesByScene)[0];
  const sceneManager = new SceneManager(initialScene, entriesByScene);
  const inventory = new Inventory();
  return new System({
    modules: [sceneManager, inventory, new InteractionMemory()],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
};

const getEntriesByScene = (serializedSystem: SerializedSystem) =>
  serializedSystem.scenes.reduce(
    (scenes, scene) => ({
      ...scenes,
      [scene.name]: scene.entities.map(initializeEntity),
    }),
    {} as Record<string, Entity[]>
  );

const initializeEntity = ({ name }: SerializedEntity) =>
  new Entity([
    new Describable({
      description: name,
    }),
  ]);
