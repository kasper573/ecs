import {
  Collectable,
  CollectableEntityState,
} from "../../ecs-collectable/Collectable";
import { Describable } from "../../ecs-describable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { TextAdventureState } from "../TextAventureState";
import { TextAdventureSM } from "../TextAdventureSM";
import { Bridge } from "./Bridge";

export class BridgeRepairEquipment extends StatefulEntity<
  CollectableEntityState,
  TextAdventureState
> {
  get sceneManager() {
    return this.system.modules.resolveType(TextAdventureSM);
  }
  get bridge() {
    return this.sceneManager.scene.findType(Bridge);
  }

  constructor() {
    super({ name: "repair kit" });
    this.components.push(
      new Collectable(),
      new Describable({
        description: () =>
          `There's a ${this.state.name} conveniently laying on the ground.`,
      }),
      new Interactive({
        action: "Repair bridge",
        isActive: () =>
          this.system.state.inventory.includes(this) &&
          this.sceneManager.sceneId === "cliff" &&
          !!this.bridge &&
          this.bridge.state !== "sturdy",
        perform: () => {
          if (this.bridge) {
            this.bridge.state = "sturdy";
            return "You repaired the bridge.";
          }
        },
      })
    );
  }
}
