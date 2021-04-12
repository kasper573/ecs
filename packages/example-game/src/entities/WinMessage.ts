import { Entity } from "../../../ecs/src/Entity";
import { Describable } from "../../../ecs-text-adventure/src/describable/Describable";

export class WinMessage extends Entity {
  constructor() {
    super();
    this.components.push(new Describable({ description: "You win!" }));
  }
}
