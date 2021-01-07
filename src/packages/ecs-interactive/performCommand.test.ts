import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { performCommand } from "./performCommand";
import { Interactive } from "./Interactive";

test("gets unknown command result when trying to perform an unknown command", () => {
  const system = new System([]);
  const result = performCommand(system, "Do something");
  expect(result).toEqual(`Could not "Do something"`);
});

test("performing an action returns the expected result", () => {
  const system = new System([
    new Entity([
      new Interactive({
        action: "Foo",
        perform: () => "Result",
      }),
    ]),
  ]);
  const result = performCommand(system, "Foo");
  expect(result).toEqual("Result");
});

test("performing an action invokes the specified function", () => {
  let didInvoke = false;
  const system = new System([
    new Entity([
      new Interactive({
        action: "Foo",
        perform: () => {
          didInvoke = true;
        },
      }),
    ]),
  ]);
  performCommand(system, "Foo");
  expect(didInvoke).toBe(true);
});
