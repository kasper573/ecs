import { componentProperties } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { Container } from "../ecs/Container";
import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";

export class Inventory extends Interactive.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  action: { ...interactiveProperties.action, hidden: true },
  effect: { ...interactiveProperties.effect, hidden: true },
}) {
  readonly items = new Container<Entity>();

  static create(...items: Entity[]) {
    const inv = new Inventory();
    inv.items.push(...items);
    return inv;
  }

  constructor() {
    super({
      isActive: true,
      action: "View inventory",
      effect: () =>
        this.items.length > 0
          ? `Inventory: ${this.items.map((e) => e.name).join(", ")}`
          : "Your inventory is empty!",
    });
  }
}
