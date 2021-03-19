import { System } from "../ecs/System";
import { Inventory } from "../ecs-collectable/Inventory";
import { InteractionMemory } from "../ecs-interactive/InteractionMemory";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { TextAdventureSM } from "./TextAdventureSM";
import { PunchingBag } from "./entities/PunchingBag";

export const createGame = () => {
  const bridge = new Bridge();
  const sceneManager = new TextAdventureSM("cliff", {
    cliff: [bridge, new BridgeRepairEquipment(), new PunchingBag()],
    bridge: [bridge],
    pit: [new Darkness(), new Ladder()],
    otherSide: [new WinMessage()],
  });
  const inventory = new Inventory(new Lighter());
  return new System({
    modules: [sceneManager, inventory, new InteractionMemory()],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
};
