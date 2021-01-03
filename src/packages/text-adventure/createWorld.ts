import { Bridge } from "./entities/Bridge";
import { BridgeRepairEquipment } from "./entities/BridgeRepairEquipment";
import { Darkness } from "./entities/Darkness";
import { Ladder } from "./entities/Ladder";
import { WinMessage } from "./entities/WinMessage";
import { Lighter } from "./entities/Lighter";
import { Container } from "../ecs/Container";
import { TextAdventureState } from "./TextAventureState";
import { World } from "../ecs/World";
import { Scenes } from "./Scenes";

export const createWorld = () => {
  const bridge = new Bridge();
  return new World<TextAdventureState>({
    sceneId: Scenes.cliff,
    scenes: {
      [Scenes.cliff]: [bridge, new BridgeRepairEquipment()],
      [Scenes.bridge]: [bridge],
      [Scenes.pit]: [new Darkness(), new Ladder()],
      [Scenes.otherSide]: [new WinMessage()],
    },
    state: { inventory: new Container(new Lighter()) },
    entities: (world) => [...(world.scene || []), ...world.state.inventory],
  });
};
