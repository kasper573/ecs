import { describeSystem } from "../ecs-describable/describeSystem";
import { performCommand } from "../ecs-interactive/performCommand";
import { createGame } from "./createGame";

test("Can play through optimistic route of story", () => {
  const system = createGame();
  expect(describeSystem(system)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
There's a punching bag. It's in perfect shape.
Actions:
- Cross the bridge
- View inventory
- Pick up repair kit
- Punch bag`
  );

  performCommand(system, "Punch bag");

  expect(describeSystem(system)).toEqual(
    `You punch the damn perfect bag. You wish you could be in perfect shape too.
You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
There's a punching bag. It's looking bruised.
Actions:
- Cross the bridge
- View inventory
- Pick up repair kit
- Punch bag`
  );

  performCommand(system, "Punch bag");

  expect(describeSystem(system)).toEqual(
    `You punch the bag. You feel way better about yourself.
You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
There's a punching bag. It's falling apart.
Actions:
- Cross the bridge
- View inventory
- Pick up repair kit
- Punch bag`
  );

  performCommand(system, "Punch bag");

  expect(describeSystem(system)).toEqual(
    `The punching bag breaks. You say out loud "I just wanted to destroy something beautiful".
You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
There's a punching bag. It is broken.
Actions:
- Cross the bridge
- View inventory
- Pick up repair kit`
  );

  performCommand(system, "Cross the bridge");

  expect(describeSystem(system)).toEqual(
    `You are standing on the bridge. It seems very unstable.
Actions:
- Proceed
- Go back
- View inventory`
  );

  performCommand(system, "Proceed");

  expect(describeSystem(system)).toEqual(
    `The bridge collapses under your weight. You fall down a pit.
It is very dark.
Actions:
- View inventory
- Use lighter`
  );

  performCommand(system, "Use lighter");

  expect(describeSystem(system)).toEqual(
    `You see a ladder.
Actions:
- View inventory
- Stop using lighter
- Climb ladder`
  );

  performCommand(system, "Climb ladder");

  expect(describeSystem(system)).toEqual(
    `You stand in front of a bridge. It looks broken.
There's a repair kit conveniently laying on the ground.
There's a punching bag. It is broken.
Actions:
- Cross the bridge
- View inventory
- Pick up repair kit`
  );

  performCommand(system, "Pick up repair kit");

  expect(describeSystem(system)).toEqual(
    `Picked up repair kit.
You stand in front of a bridge. It looks broken.
There's a punching bag. It is broken.
Actions:
- Cross the bridge
- View inventory
- Repair bridge`
  );

  performCommand(system, "Repair bridge");

  expect(describeSystem(system)).toEqual(
    `You repaired the bridge.
You stand in front of a bridge. It looks sturdy.
There's a punching bag. It is broken.
Actions:
- Cross the bridge
- View inventory`
  );

  performCommand(system, "Cross the bridge");

  expect(describeSystem(system)).toEqual(
    `You win!
Actions:
- View inventory`
  );
});
