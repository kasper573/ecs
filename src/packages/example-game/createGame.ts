import { System } from "../ecs/System";
import { Inventory } from "../ecs-collectable/Inventory";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { TextAdventureState } from "./TextAventureState";
import { TextAdventureSM } from "./TextAdventureSM";

export const createGame = () => {
  const bridge = new Bridge();
  const sceneManager = new TextAdventureSM("cliff", {
    cliff: [bridge, new BridgeRepairEquipment()],
    bridge: [bridge],
    pit: [new Darkness(), new Ladder()],
    otherSide: [new WinMessage()],
  });
  return new System<TextAdventureState>({
    modules: [sceneManager],
    state: { inventory: new Inventory(new Lighter()) },
    entities: (state) => [...(sceneManager.scene ?? []), ...state.inventory],
  });
};
