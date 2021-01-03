import { describeWorld } from "../ecs-describable/describeWorld";
import { createWorld } from "./createWorld";
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

  let lastEffect = performCommand(world, "Cross the bridge");

  expect(describeWorld(world, lastEffect)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  lastEffect = performCommand(world, "Proceed");

  expect(describeWorld(world, lastEffect)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  lastEffect = performCommand(world, "Use lighter");

  expect(describeWorld(world, lastEffect)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  lastEffect = performCommand(world, "Climb ladder");

  expect(describeWorld(world, lastEffect)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  lastEffect = performCommand(world, "Pick up repair kit");

  expect(describeWorld(world, lastEffect)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  lastEffect = performCommand(world, "Repair bridge");

  expect(describeWorld(world, lastEffect)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  lastEffect = performCommand(world, "Cross the bridge");

  expect(describeWorld(world, lastEffect)).toEqual("You win!");
});
