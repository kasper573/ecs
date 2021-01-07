import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { TextAdventureState } from "../TextAventureState";
import { Lighter } from "./Lighter";

export class Darkness extends Entity<TextAdventureState> {
  constructor() {
    super();
    this.components = [
      new Describable({
        description: "It is very dark.",
        isActive: () => {
          const lighter = this.system.state.inventory.findType(Lighter);
          return !lighter || !lighter.isLit;
        },
      }),
    ];
  }
}
