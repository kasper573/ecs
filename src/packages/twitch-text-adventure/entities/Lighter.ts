import { Interactive } from "../../ecs-interactive/Interactive";
import { System } from "../../ecs/System";
import { TextAdventureSM } from "../TextAdventureSM";
import { Inventory } from "../../ecs-collectable/Inventory";
import { Entity } from "../../ecs/Entity";

export type LighterState = "lit" | "unlit";

export class Lighter extends Entity {
  state: LighterState = "unlit";

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
    super();
    this.components.push(
      new Interactive({
        isActive: () => this.sceneManager.sceneId === "pit",
        action: () => this.actionText,
        effect: () => this.toggle(),
      })
    );
  }

  static isLit(system: System) {
    const inventory = system.modules.resolveType(Inventory);
    const lighter = inventory.findType(Lighter);
    return lighter ? lighter.isLit : false;
  }
}
