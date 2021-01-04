import { Container } from "../ecs/Container";
import { System } from "../ecs/System";
import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { TextAdventureState } from "./TextAventureState";
import { Scenes } from "./Scenes";

export const createSystem = () => {
  const bridge = new Bridge();
  return new System<TextAdventureState>({
    sceneId: Scenes.cliff,
    scenes: {
      [Scenes.cliff]: [bridge, new BridgeRepairEquipment()],
      [Scenes.bridge]: [bridge],
      [Scenes.pit]: [new Darkness(), new Ladder()],
      [Scenes.otherSide]: [new WinMessage()],
    },
    state: { inventory: new Container(new Lighter()) },
    entities: (system) => [...(system.scene || []), ...system.state.inventory],
  });
};
