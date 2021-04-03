import { Collectable } from "../../ecs-collectable/Collectable";
import { Describable } from "../../ecs-describable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { TextAdventureSM } from "../TextAdventureSM";
import { Inventory } from "../../ecs-collectable/Inventory";
import { Entity } from "../../ecs/Entity";
import { Bridge } from "./Bridge";

export class BridgeRepairEquipment extends Entity {
  get sceneManager() {
    return this.system.modules.resolveType(TextAdventureSM);
  }
  get inventory() {
    return this.system.modules.resolveType(Inventory);
  }
  get bridge() {
    return this.sceneManager.scene?.findType(Bridge);
  }

  constructor() {
    super([], "repair kit");
    this.components.push(
      new Collectable(),
      new Describable({
        description: () =>
          `There's a ${this.name} conveniently laying on the ground.`,
      }),
      new Interactive({
        action: "Repair bridge",
        isActive: () =>
          this.inventory.includes(this) &&
          this.sceneManager.sceneId === "cliff" &&
          !!this.bridge &&
          this.bridge.state !== "sturdy",
        effect: () => {
          if (this.bridge) {
            this.bridge.state = "sturdy";
            return "You repaired the bridge.";
          }
        },
      })
    );
  }
}
