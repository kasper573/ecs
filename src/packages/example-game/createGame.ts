import { System } from "../ecs/System";
import { Inventory } from "../ecs-collectable/Inventory";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { TextAdventureState } from "./TextAventureState";
import { Scenes } from "./Scenes";

export const createGame = () => {
  const bridge = new Bridge();
  return new System<TextAdventureState>({
    sceneId: Scenes.cliff,
    scenes: {
      [Scenes.cliff]: [bridge, new BridgeRepairEquipment()],
      [Scenes.bridge]: [bridge],
      [Scenes.pit]: [new Darkness(), new Ladder()],
      [Scenes.otherSide]: [new WinMessage()],
    },
    state: { inventory: new Inventory(new Lighter()) },
    entities: (system) => [...(system.scene || []), ...system.state.inventory],
  });
};
