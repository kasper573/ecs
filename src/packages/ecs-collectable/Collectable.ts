import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { componentProperties } from "../ecs/Component";
import { Inventory } from "./Inventory";

export class Collectable extends Interactive.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  action: { ...interactiveProperties.action, hidden: true },
  effect: { ...interactiveProperties.effect, hidden: true },
}) {
  get sceneManager() {
    return this.entity.system.modules.resolveType(SceneManager);
  }

  get inventory() {
    return this.entity.system.modules.resolveType(Inventory);
  }

  get isCollected() {
    return this.inventory.includes(this.entity);
  }

  constructor() {
    super({
      isActive: () => !this.isCollected,
      action: ({ entity }) => `Pick up ${entity.name}`,
      effect: ({ entity }) => {
        this.inventory.push(this.entity);
        for (const scene of Object.values(this.sceneManager.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${entity.name}.`;
      },
    });
  }
}
