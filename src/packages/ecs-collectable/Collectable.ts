import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { componentProperties } from "../ecs/Component";
import { findSystemComponent } from "../ecs/findSystemComponent";
import { Inventory } from "./Inventory";

export class Collectable extends Interactive.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  action: { ...interactiveProperties.action, hidden: true },
  effect: { ...interactiveProperties.effect, hidden: true },
}) {
  get sceneManager() {
    return this.entity.system.modules.resolveType(SceneManager);
  }

  get hasInventory() {
    return !!this.inventory;
  }

  get inventory() {
    return findSystemComponent(this.entity.system, Inventory);
  }

  get isCollected() {
    return this.inventory?.items.includes(this.entity);
  }

  constructor() {
    super({
      isActive: () => this.hasInventory && !this.isCollected,
      action: ({ entity }) => `Pick up ${entity.name}`,
      effect: ({ entity }) => {
        const inv = this.inventory;
        if (!inv) {
          return;
        }
        inv.items.push(this.entity);
        for (const scene of Object.values(this.sceneManager.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${entity.name}.`;
      },
    });
  }
}
