import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";
import { Interactive } from "../../ecs-interactive/Interactive";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { System } from "../../ecs/System";

export type LighterState = "lit" | "unlit";

export class Lighter extends StatefulEntity<LighterState, TextAdventureState> {
  get actionText() {
    return this.state === "lit" ? "Stop using lighter" : "Use lighter";
  }

  get isLit() {
    return this.state === "lit";
  }

  toggle() {
    this.state = this.state === "lit" ? "unlit" : "lit";
  }

  constructor() {
    super("unlit");
    this.components = [
      new Interactive({
        isActive: () => this.system.sceneId === Scenes.pit,
        action: () => this.actionText,
        perform: () => this.toggle(),
      }),
    ];
  }

  static isLit(system: System<TextAdventureState>) {
    const lighter = system.state.inventory.findType(Lighter);
    return lighter ? lighter.isLit : false;
  }
}
