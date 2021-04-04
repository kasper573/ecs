import { System } from "../ecs/System";
import { InteractionMemory } from "../ecs-interactive/InteractionMemory";
import { Entity } from "../ecs/Entity";
import { Inventory } from "../ecs-collectable/Inventory";
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
  const sceneManager = new TextAdventureSM({
    cliff: [bridge, new BridgeRepairEquipment(), new PunchingBag()],
    bridge: [bridge],
    pit: [new Darkness(), new Ladder()],
    otherSide: [new WinMessage()],
  });
  const inventory = Inventory.create(new Lighter());
  const inventoryEntity = new Entity([inventory]);
  return new System({
    modules: [sceneManager, new InteractionMemory()],
    entities: () => [
      ...(sceneManager.scene ?? []),
      inventoryEntity,
      ...inventory.items,
    ],
  });
};
