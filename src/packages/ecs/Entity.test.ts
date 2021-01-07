import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("Entity components have a reference to their entity", () => {
  const entity = new Entity([new Component()]);
  expect(entity.components[0].entity).toBe(entity);
});

test("Entities have a reference to their system", () => {
  const system = new System([new Entity()]);
  expect(system.entities[0].system).toBe(system);
});
