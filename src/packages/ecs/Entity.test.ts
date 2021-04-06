import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("Entity children initializer is added as children on Entity construction", () => {
  const child = new Entity();
  const parent = new Entity([], [child]);
  expect(parent.children[0]).toBe(child);
});

test("Entity children are given a reference to their parent", () => {
  const child = new Entity();
  const parent = new Entity([], [child]);
  expect(child.parent).toBe(parent);
});

test("Entity children lose their parent reference when removed", () => {
  const child = new Entity();
  const parent = new Entity([], [child]);
  parent.children.remove(child);
  expect(child.parent).toBeUndefined();
});

describe("Entity components", () => {
  test("are given a reference to their entity on initialization", () => {
    const cmp = new Component();
    const entity = new Entity([cmp]);
    expect(cmp.entity).toBe(entity);
  });

  test("are given a reference to their entity when added after initialization", () => {
    const cmp = new Component();
    const entity = new Entity();
    entity.components.push(cmp);
    expect(cmp.entity).toBe(entity);
  });

  test("lose the reference to their entity when removed from the entity", () => {
    const cmp = new Component();
    const entity = new Entity([cmp]);
    entity.components.remove(cmp);
    expect(cmp.entity).toBeUndefined();
  });
});

it("disposing a system disposes all entities in the hierarchy", () => {
  const c = new Entity();
  const b = new Entity([], [c]);
  const a = new Entity([], [b]);
  const system = new System(a);
  system.dispose();
  expectDisposed(a);
  expectDisposed(b);
  expectDisposed(c);
});

it("can dispose a single entity without components", () => {
  const a = new Entity();
  a.dispose();
  expectDisposed(a);
});

it("can dispose a single entity with components", () => {
  const a = new Entity([new Component()]);
  a.dispose();
  expectDisposed(a);
});

function expectDisposed(entity: Entity) {
  expect(entity.parent).toBeUndefined();
  expect(entity.components.length).toBe(0);
  expect(entity.components.events.listenerCount("change")).toBe(0);
  expect(entity.children.length).toBe(0);
  expect(entity.children.events.listenerCount("change")).toBe(0);
}
