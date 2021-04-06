import { System } from "../ecs/System";
import { InteractionMemory } from "../ecs-text-adventure/interactive/InteractionMemory";
import { Entity } from "../ecs/Entity";
import { Inventory } from "../ecs-text-adventure/collectable/Inventory";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { PunchingBag } from "./entities/PunchingBag";

export const createGame = () => {
  const bridge = new Bridge();
  const sceneManager = SceneManager.create({
    cliff: [new BridgeRepairEquipment(), new PunchingBag()],
    bridge: [],
    pit: [new Darkness(), new Ladder()],
    otherSide: [new WinMessage()],
  });
  const inventory = Inventory.create(new Lighter());
  const interactionMemory = new InteractionMemory();
  const utilityEntity = new Entity([inventory, interactionMemory]);
  return new System(bridge, utilityEntity, sceneManager);
};
