import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";
import { componentProperties } from "../ecs/Component";
import { Inventory } from "./Inventory";

export class Collectable extends Interactive.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  action: { ...interactiveProperties.action, hidden: true },
  effect: { ...interactiveProperties.effect, hidden: true },
}) {
  get hasInventory() {
    return !!this.inventory;
  }

  get inventory() {
    return this.entity?.system?.entities.findComponent(Inventory);
  }

  get isCollected() {
    return this.entity && this.inventory?.items.includes(this.entity);
  }

  constructor() {
    super({
      isActive: () => this.hasInventory && !this.isCollected,
      action: ({ entity }) => `Pick up ${entity?.name}`,
      effect: ({ entity }) => {
        const inv = this.inventory;
        if (inv && this.entity) {
          inv.items.push(this.entity);
          return `Picked up ${entity?.name}.`;
        }
      },
    });
  }
}
