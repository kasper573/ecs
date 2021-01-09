import { TextAdventureState } from "../TextAventureState";
import { Interactive } from "../../ecs-interactive/Interactive";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { System } from "../../ecs/System";
import { TextAdventureSM } from "../TextAdventureSM";

export type LighterState = "lit" | "unlit";

export class Lighter extends StatefulEntity<LighterState, TextAdventureState> {
  get sceneManager() {
    return this.system.modules.resolveType(TextAdventureSM);
  }

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
    this.components.push(
      new Interactive({
        isActive: () => this.sceneManager.sceneId === "pit",
        action: () => this.actionText,
        perform: () => this.toggle(),
      })
    );
  }

  static isLit(system: System<TextAdventureState>) {
    const lighter = system.state.inventory.findType(Lighter);
    return lighter ? lighter.isLit : false;
  }
}
