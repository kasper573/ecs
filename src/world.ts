import { World } from "./engine/types/World";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";

export const createWorld = () => {
  const bridge = new Bridge();
  const world = new World("cliff", {
    cliff: [bridge, new BridgeRepairEquipment()],
    bridge: [bridge],
    pit: [new Darkness(), new Ladder()],
    otherSide: [new WinMessage()],
  });

  world.inventory.push(new Lighter());
  return world;
};
