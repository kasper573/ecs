import { describeSystem } from "../ecs-describable/describeSystem";
import { performCommand } from "../ecs-interactive/performCommand";
import { createGame } from "./createGame";

test("Can play through optimistic route of story", () => {
  const system = createGame();
  expect(describeSystem(system)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  let lastEffect = performCommand(system, "Cross the bridge");

  expect(describeSystem(system, lastEffect)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  lastEffect = performCommand(system, "Proceed");

  expect(describeSystem(system, lastEffect)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  lastEffect = performCommand(system, "Use lighter");

  expect(describeSystem(system, lastEffect)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  lastEffect = performCommand(system, "Climb ladder");

  expect(describeSystem(system, lastEffect)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  lastEffect = performCommand(system, "Pick up repair kit");

  expect(describeSystem(system, lastEffect)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  lastEffect = performCommand(system, "Repair bridge");

  expect(describeSystem(system, lastEffect)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  lastEffect = performCommand(system, "Cross the bridge");

  expect(describeSystem(system, lastEffect)).toEqual("You win!");
});
