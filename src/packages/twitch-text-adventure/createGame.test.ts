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

  performCommand(system, "Cross the bridge");

  expect(describeSystem(system)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  performCommand(system, "Proceed");

  expect(describeSystem(system)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  performCommand(system, "Use lighter");

  expect(describeSystem(system)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  performCommand(system, "Climb ladder");

  expect(describeSystem(system)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  performCommand(system, "Pick up repair kit");

  expect(describeSystem(system)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  performCommand(system, "Repair bridge");

  expect(describeSystem(system)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  performCommand(system, "Cross the bridge");

  expect(describeSystem(system)).toEqual("You win!");
});
