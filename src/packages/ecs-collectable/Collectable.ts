import { Interactive } from "../ecs-interactive/Interactive";
import { StatefulEntity } from "../ecs/StatefulEntity";
import { Describable } from "../ecs-describable/Describable";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { Inventory } from "./Inventory";

export class Collectable<
  Entity extends StatefulEntity<CollectableState>
> extends Interactive<Entity> {
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
      action: () => `Pick up ${this.entity.state.name}`,
      perform: () => {
        this.inventory.push(this.entity);
        for (const scene of Object.values(this.sceneManager.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${this.entity.state.name}.`;
      },
      update: () => {
        const { isCollected, entity } = this;
        for (const desc of entity.components.filterType(Describable)) {
          desc.options.isActiveDefault = !isCollected;
        }
      },
    });
  }
}

export type CollectableState = {
  name: string;
};
