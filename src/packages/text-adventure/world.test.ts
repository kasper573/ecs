import { describeWorld } from "../ecs-text/describeWorld";
import { createWorld } from "./world";
import { performCommand } from "../ecs/performCommand";

test("Can play through optimistic route of story", () => {
  const world = createWorld();
  expect(describeWorld(world)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  performCommand(world, "Cross the bridge");

  expect(describeWorld(world)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  performCommand(world, "Proceed");

  expect(describeWorld(world)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  performCommand(world, "Use lighter");

  expect(describeWorld(world)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  performCommand(world, "Climb ladder");

  expect(describeWorld(world)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  performCommand(world, "Pick up repair kit");

  expect(describeWorld(world)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  performCommand(world, "Repair bridge");

  expect(describeWorld(world)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  performCommand(world, "Cross the bridge");

  expect(describeWorld(world)).toEqual("You win!");
});
