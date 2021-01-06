import {
  Collectable,
  CollectableEntityState,
} from "../../ecs-collectable/Collectable";
import { Describable } from "../../ecs-describable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";
import { Bridge } from "./Bridge";

export class BridgeRepairEquipment extends StatefulEntity<
  CollectableEntityState,
  TextAdventureState
> {
  get bridge() {
    return this.system.scene.findType(Bridge);
  }

  constructor() {
    super({ name: "repair kit" });
    this.components = [
      new Collectable(),
      new Describable({
        description: () =>
          `There's a ${this.state.name} conveniently laying on the ground.`,
      }),
      new Interactive({
        action: "Repair bridge",
        isActive: () =>
          this.system.state.inventory.includes(this) &&
          this.system.sceneId === Scenes.cliff &&
          !!this.bridge &&
          this.bridge.state !== "sturdy",
        apply: () => {
          if (this.bridge) {
            this.bridge.state = "sturdy";
            return "You repaired the bridge.";
          }
        },
      }),
    ];
  }
}
