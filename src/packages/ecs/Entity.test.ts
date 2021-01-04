import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("can derive entity components based on initial entity state", () => {
  const entity = new Entity("entity", { count: 3 }, ({ count }) =>
    repeat(count, new Component())
  );
  const components = entity.getComponents(new System());
  expect(components).toHaveLength(3);
});

test("can derive entity components based on changed entity state", () => {
  const entity = new Entity("entity", { count: 3 }, ({ count }) =>
    repeat(count, new Component())
  );
  entity.state.count = 2;
  const components = entity.getComponents(new System());
  expect(components).toHaveLength(2);
});

test("can derive entity components based on initial system state", () => {
  const entity = new Entity<{}, number>("entity", {}, (state, system) =>
    repeat(system.state, new Component())
  );
  const components = entity.getComponents(new System({ state: 3 }));
  expect(components).toHaveLength(3);
});

test("can derive entity components based on changed system state", () => {
  const entity = new Entity<{}, number>("entity", {}, (state, system) =>
    repeat(system.state, new Component())
  );
  const system = new System({ state: 3 });
  system.state = 2;
  const components = entity.getComponents(system);
  expect(components).toHaveLength(2);
});

const repeat = <T>(count: number, value: T) => {
  const values: T[] = [];
  for (let i = 0; i < count; i++) {
    values.push(value);
  }
  return values;
};
