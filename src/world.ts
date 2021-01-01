import { World } from "./engine/types/World";
import { bridge } from "./entities/bridge";
import { bridgeRepairEquipment } from "./entities/bridgeRepairEquipment";
import { darkness } from "./entities/darkness";
import { ladder } from "./entities/ladder";
import { winMessage } from "./entities/winMessage";
import { lighter } from "./entities/lighter";

export const world = new World("cliff", {
  cliff: [bridge, bridgeRepairEquipment],
  bridge: [bridge],
  pit: [darkness, ladder],
  otherSide: [winMessage],
});

world.inventory.push(lighter);
