import { Interactive } from "../../ecs-interactive/Interactive";
import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { Entity } from "../../ecs/Entity";
import { findSystemComponent } from "../../ecs/findSystemComponent";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";

export type LighterState = "lit" | "unlit";

export class Lighter extends Entity {
  state: LighterState = "unlit";

  get sceneManager() {
    return findSystemComponent(this.system, SceneManager);
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
        isActive: () => this.sceneManager?.sceneId === "pit",
        action: () => this.actionText,
        effect: () => this.toggle(),
      })
    );
  }

  static isLit(system?: System) {
    const inventory = findSystemComponent(system, Inventory);
    const lighter = inventory?.items.findType(Lighter);
    return lighter ? lighter.isLit : false;
  }
}
