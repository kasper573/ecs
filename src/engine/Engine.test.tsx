import { describeGame } from "./presentation/describeGame";
import { Entity } from "./types/Entity";
import { Game } from "./types/Game";
import { ObservableTrait } from "./traits/ObservableTrait";
import { CollectableTrait } from "./traits/CollectableTrait";
import { Trait } from "./types/Trait";

test("Can perform story example", () => {
  const game = new Game("bridge", {
    bridge: { entities: [bridge, bridgeRepairEquipment] },
    goals: { entities: [winMessage] },
  });

  expect(describeGame(game)).toEqual(
    `You stand in front of a bridge. It looks fragile.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  game.perform("Cross the bridge");

  expect(describeGame(game)).toEqual(
    `The bridge creaks. It seems very unstable.
You are standing on the bridge.
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
- Climb ladder`
  );

  game.perform("Climb ladder");

  expect(describeGame(game)).toEqual(
    `You stand in front of a bridge. It is broken.
There's a repair kit conveniently laying on the ground.
Actions:
- Cross the bridge
- Pick up repair kit`
  );

  game.perform("Pick up repair kit");

  expect(describeGame(game)).toEqual(
    `You stand in front of a bridge. It is broken.
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

const bridge = new Entity<"fragile" | "broken" | "repaired">(
  "bridge",
  "fragile",
  (state) => [
    new Trait((entity) => `Cross the ${entity.name}`),
    new ObservableTrait(`You stand in front of a bridge. It looks ${state}.`),
  ]
);

const bridgeRepairEquipment = Entity.forTraits(
  "repair kit",
  new CollectableTrait(),
  // new ConsumableTrait(),
  // new UsableTrait(),
  new ObservableTrait(
    (entity) => `There's a ${entity.name} conveniently laying on the ground.`
  )
);

const winMessage = Entity.forTraits(
  "win-message",
  new ObservableTrait("You win!")
);
