import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-text-adventure/describable/Describable";

export class WinMessage extends Entity {
  constructor() {
    super();
    this.components.push(new Describable({ description: "You win!" }));
  }
}
