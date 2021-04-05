import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { Inventory } from "../../ecs-collectable/Inventory";
import { Lighter } from "./Lighter";

export class Darkness extends Entity {
  constructor() {
    super();
    this.components.push(
      new Describable({
        description: "It is very dark.",
        isActive: () => {
          const inventory = this.system?.entities.findComponent(Inventory);
          const lighter = inventory?.items.findType(Lighter);
          return !lighter || !lighter.isLit;
        },
      })
    );
  }
}
