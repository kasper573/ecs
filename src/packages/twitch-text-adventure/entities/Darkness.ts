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
          const inventory = this.system.modules.resolveType(Inventory);
          const lighter = inventory.findType(Lighter);
          return !lighter || !lighter.isLit;
        },
      })
    );
  }
}
