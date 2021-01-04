import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Interactive } from "./Interactive";
import { createActions } from "./createActions";

test("Interactives without names do not become actions", () => {
  const system = new System([
    new Entity("entity", {}, () => [
      new Interactive({
        apply: () => {},
      }),
    ]),
  ]);
  const actions = createActions(system);
  expect(actions).toHaveLength(0);
});

test("actions can return effects", () => {
  const effect = { description: "Bar" };
  const system = new System([
    new Entity("entity", {}, () => [
      new Interactive({
        action: () => "Foo",
        apply: () => effect,
      }),
    ]),
  ]);
  const [action] = createActions(system);
  expect(action.perform(system)).toEqual(effect);
});

test("actions can have side effects", () => {
  let sideEffect: string | undefined = undefined;
  const system = new System([
    new Entity("entity", {}, () => [
      new Interactive({
        action: () => "Foo",
        apply: () => {
          sideEffect = "Bar";
        },
      }),
    ]),
  ]);
  const [action] = createActions(system);
  action.perform(system);
  expect(sideEffect).toEqual("Bar");
});
