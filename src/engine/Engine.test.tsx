import { describeGame } from "./presentation/describeGame";
import { Game } from "./types/Game";
import { bridgeRepairEquipment } from "../entities/bridgeRepairEquipment";
import { darkness } from "../entities/darkness";
import { winMessage } from "../entities/winMessage";
import { bridge } from "../entities/bridge";
import { ladder } from "../entities/ladder";
import { lighter } from "../entities/lighter";

test("Can perform story example", () => {
  const game = new Game("cliff", {
    cliff: { entities: [bridge, bridgeRepairEquipment] },
    bridge: { entities: [bridge] },
    pit: { entities: [darkness, ladder] },
    otherSide: { entities: [winMessage] },
  });
  game.context.inventory.push(lighter);

  expect(describeGame(game)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  game.perform("Cross the bridge");

  expect(describeGame(game)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  game.perform("Proceed");

  expect(describeGame(game)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  game.perform("Use lighter");

  expect(describeGame(game)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  game.perform("Climb ladder");

  expect(describeGame(game)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  game.perform("Pick up repair kit");

  expect(describeGame(game)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  game.perform("Repair bridge");

  expect(describeGame(game)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  game.perform("Cross the bridge");

  expect(describeGame(game)).toEqual("You win!");
});
