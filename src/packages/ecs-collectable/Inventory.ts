import { componentProperties } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import {
  Interactive,
  interactiveProperties,
} from "../ecs-interactive/Interactive";
import { Container } from "../ecs/Container";
import { Describable } from "../ecs-describable/Describable";

export class Inventory extends Interactive.extend({
  isActive: { ...componentProperties.isActive, hidden: true },
  action: { ...interactiveProperties.action, hidden: true },
  effect: { ...interactiveProperties.effect, hidden: true },
}) {
  // Having a separate container allows items to
  // be added while Inventory component is not mounted
  readonly items = new Container<Entity>();

  constructor() {
    super({
      isActive: true,
      action: "View inventory",
      effect: () =>
        this.items.length > 0
          ? `Inventory: ${this.items.map((e) => e.name).join(", ")}`
          : "Your inventory is empty!",
      mount: () =>
        this.items.mount((item) => {
          const displayComponents = item.components.filterType(Describable);
          this.entity?.children.push(item); // Move item to inventory sub tree
          item.components.remove(...displayComponents); // Stop displaying item
          return () => item.components.push(...displayComponents);
        }),
    });
  }

  static create(...items: Entity[]) {
    const inv = new Inventory();
    inv.items.push(...items);
    return inv;
  }
}
