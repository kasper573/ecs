import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-text/Describable";

export class WinMessage extends Entity {
  constructor() {
    super("win-message", undefined, () => [
      new Describable({ describe: () => "You win!" }),
    ]);
  }
}
