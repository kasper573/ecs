import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { Interactive } from "./Interactive";
import { createActions } from "./createActions";

test("Interactives without names do not become actions", () => {
  const system = new System([new Entity([new Interactive()])]);
  const actions = createActions(system);
  expect(actions).toHaveLength(0);
});

test("actions can have results", () => {
  const system = new System([
    new Entity([
      new Interactive({
        action: "Foo",
        apply: "Bar",
      }),
    ]),
  ]);
  const [action] = createActions(system);
  expect(action.perform()).toEqual("Bar");
});

test("actions can have side effects", () => {
  let sideEffect: string | undefined = undefined;
  const system = new System([
    new Entity([
      new Interactive({
        action: "Foo",
        apply: () => {
          sideEffect = "Bar";
        },
      }),
    ]),
  ]);
  const [action] = createActions(system);
  action.perform();
  expect(sideEffect).toEqual("Bar");
});

test("components get updated after actions perform", () => {
  let componentUpdates = 0;
  const system = new System([
    new Entity([
      new Component({
        update: () => {
          componentUpdates++;
        },
      }),
      new Interactive({
        action: "Foo",
        apply: () => {},
      }),
    ]),
  ]);
  componentUpdates = 0;
  const [action] = createActions(system);
  action.perform();
  expect(componentUpdates).toBe(1);
});
