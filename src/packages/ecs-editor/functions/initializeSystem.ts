import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { SerializedSystem } from "../types/SerializedSystem";
import { SerializedEntity } from "../types/SerializedEntity";
import { Interactive } from "../../ecs-interactive/Interactive";

export const initializeSystem = (
  serializedSystem: SerializedSystem,
  preferredSceneId?: string
): System => {
  const entriesByScene = getEntriesByScene(serializedSystem);
  const availableSceneIds = Object.keys(entriesByScene);
  const initialSceneId =
    preferredSceneId && availableSceneIds.includes(preferredSceneId)
      ? preferredSceneId
      : availableSceneIds[0];
  const sceneManager = new SceneManager(initialSceneId, entriesByScene);
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

const initializeEntity = (
  { name }: SerializedEntity,
  index: number
): Entity => {
  class DynamicEntity extends Entity {
    get sm() {
      return this.system.modules.resolveType(SceneManager);
    }
    get targetSceneId() {
      const sceneIds = Object.keys(this.sm.scenes);
      return sceneIds[index];
    }
    constructor() {
      super([
        new Describable({
          description: name,
        }),
        new Interactive({
          isActive: () => !!this.targetSceneId,
          action: () => `Go to ${this.targetSceneId}`,
          perform: () => {
            this.sm.sceneId = this.targetSceneId;
          },
        }),
      ]);
    }
  }
  return new DynamicEntity();
};
