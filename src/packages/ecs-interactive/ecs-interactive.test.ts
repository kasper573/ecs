import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Interactive } from "./Interactive";
import { createActions } from "./createActions";
import { interpretCommand } from "./interpretCommand";
import { performCommand } from "./performCommand";

describe("createActions.ts", () => {
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
        new Interactive({ action: () => "Foo", apply: () => effect }),
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
});

// interpretCommand.ts
test("interpretCommand can find the matching action for a command", () => {
  const system = new System([
    new Entity("entity", {}, () => [
      new Interactive({ action: () => "Do the thing" }),
    ]),
  ]);
  const actions = createActions(system);
  const action = interpretCommand("Do the thing", actions);
  expect(action).toBe(actions[0]);
});

describe("performCommand.ts", () => {
  test("gets unknown command effect when trying to perform an unknown command", () => {
    const system = new System([]);
    const effect = performCommand(system, "Do something");
    expect(effect).toEqual({ description: `Could not "Do something"` });
  });

  test("performing an action returns the expected effect", () => {
    const system = new System([
      new Entity("entity", {}, () => [
        new Interactive({
          action: () => "Foo",
          apply: () => ({ description: "Effect" }),
        }),
      ]),
    ]);
    const effect = performCommand(system, "Foo");
    expect(effect).toEqual({ description: "Effect" });
  });

  test("performing an action invokes the specified function", () => {
    let didInvoke = false;
    const system = new System([
      new Entity("entity", {}, () => [
        new Interactive({
          action: () => "Foo",
          apply: () => {
            didInvoke = true;
          },
        }),
      ]),
    ]);
    performCommand(system, "Foo");
    expect(didInvoke).toBe(true);
  });
});
