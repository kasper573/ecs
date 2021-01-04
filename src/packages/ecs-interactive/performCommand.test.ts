import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { performCommand } from "./performCommand";
import { Interactive } from "./Interactive";

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
