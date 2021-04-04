import { Component } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { Container } from "../ecs/Container";

export class Inventory extends Component {
  readonly items = new Container<Entity>();

  static create(...items: Entity[]) {
    const inv = new Inventory();
    inv.items.push(...items);
    return inv;
  }
}
