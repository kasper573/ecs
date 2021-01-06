import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Scenes } from "../Scenes";
import { TextAdventureState } from "../TextAventureState";
import { Lighter } from "./Lighter";

export class Ladder extends Entity<TextAdventureState> {
  constructor() {
    super();
    this.components = [
      new Describable({
        description: "You see a ladder.",
        isActive: () => Lighter.isLit(this.system),
      }),
      new Interactive({
        action: "Climb ladder",
        isActive: () => Lighter.isLit(this.system),
        perform: () => {
          this.system.sceneId = Scenes.cliff;
        },
      }),
    ];
  }
}
