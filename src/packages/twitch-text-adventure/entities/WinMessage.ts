import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { TextAdventureState } from "../TextAventureState";

export class WinMessage extends Entity<TextAdventureState> {
  constructor() {
    super();
    this.components.push(new Describable({ description: "You win!" }));
  }
}
