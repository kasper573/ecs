import * as zod from "zod";
import { Interactive } from "../ecs-interactive/Interactive";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { Inventory } from "./Inventory";

export class Collectable extends Interactive.extend({
  name: { type: zod.string(), defaultValue: "" },
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
      perform: () => {
        this.inventory.push(this.entity);
        for (const scene of Object.values(this.sceneManager.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${this.name}.`;
      },
    });
  }
}
