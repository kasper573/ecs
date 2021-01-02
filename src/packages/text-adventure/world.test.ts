import { describeWorld } from "../ecs-text/describeWorld";
import { createWorld } from "./world";

test("Can play through optimistic route of story", () => {
  const world = createWorld();
  expect(describeWorld(world)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  world.perform("Cross the bridge");

  expect(describeWorld(world)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back`
  );

  world.perform("Proceed");

  expect(describeWorld(world)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- Use lighter`
  );

  world.perform("Use lighter");

  expect(describeWorld(world)).toEqual(
    `You see a ladder.
Actions:
- Climb ladder
- Stop using lighter`
  );

  world.perform("Climb ladder");

  expect(describeWorld(world)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  world.perform("Pick up repair kit");

  expect(describeWorld(world)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
Actions:
- Cross the bridge
- Repair bridge`
  );

  world.perform("Repair bridge");

  expect(describeWorld(world)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
Actions:
- Cross the bridge`
  );

  world.perform("Cross the bridge");

  expect(describeWorld(world)).toEqual("You win!");
});
