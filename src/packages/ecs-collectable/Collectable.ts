import { Interactive } from "../ecs-interactive/Interactive";
import { StatefulEntity } from "../ecs/StatefulEntity";
import { Describable } from "../ecs-describable/Describable";
import { HasInventory } from "./HasInventory";

export class Collectable<
  Entity extends StatefulEntity<CollectableEntityState, HasInventory>
> extends Interactive<Entity> {
  get inventory() {
    return this.entity.system.state.inventory;
  }

  get isCollected() {
    return this.inventory.includes(this.entity);
  }

  constructor() {
    super({
      isActive: () => !this.isCollected,
      action: () => `Pick up ${this.entity.state.name}`,
      apply: () => {
        this.inventory.push(this.entity!);
        for (const scene of Object.values(this.entity.system.scenes)) {
          scene.remove(this.entity);
        }
        return `Picked up ${this.entity.state.name}.`;
      },
      update: () => {
        const { isCollected, entity } = this;
        for (const desc of entity.findComponents(Describable)) {
          desc.defaultActive = !isCollected;
        }
      },
    });
  }
}

export type CollectableEntityState = {
  name: string;
};
