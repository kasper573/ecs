import * as zod from "zod";
import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { componentProperties } from "../ecs/Component";
import { Inventory } from "./Inventory";

export class Collectable extends Interactive.extend({
  name: { type: zod.string(), defaultValue: "" },
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
      action: () => `Pick up ${this.name}`,
      effect: () => {
        this.inventory.push(this.entity);
        for (const scene of Object.values(this.sceneManager.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${this.name}.`;
      },
    });
  }
}
