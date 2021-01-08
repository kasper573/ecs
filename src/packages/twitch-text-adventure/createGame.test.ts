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

  let lastResult = performCommand(system, "Cross the bridge");

  expect(describeSystem(system, lastResult)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  lastResult = performCommand(system, "Proceed");

  expect(describeSystem(system, lastResult)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  lastResult = performCommand(system, "Use lighter");

  expect(describeSystem(system, lastResult)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  lastResult = performCommand(system, "Climb ladder");

  expect(describeSystem(system, lastResult)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  lastResult = performCommand(system, "Pick up repair kit");

  expect(describeSystem(system, lastResult)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  lastResult = performCommand(system, "Repair bridge");

  expect(describeSystem(system, lastResult)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  lastResult = performCommand(system, "Cross the bridge");

  expect(describeSystem(system, lastResult)).toEqual("You win!");
});
