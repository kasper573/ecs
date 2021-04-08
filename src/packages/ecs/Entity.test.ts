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

test("Initializing an entity with the same child entity instance twice becomes only one added child", () => {
  const child = new Entity();
  const parent = new Entity([], [child, child]);
  expect(parent.children.length).toBe(1);
});

test("Adding the same entity instance twice as entity child does not become two added children", () => {
  const child = new Entity();
  const parent = new Entity();
  parent.children.push(child);
  parent.children.push(child);
  expect(parent.children.length).toBe(1);
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

  test("gets mounted when added to an entity", () => {
    const [component, events, clearEvents] = createSpyComponent();
    clearEvents();
    new Entity([component]);
    expect(events).toEqual(["mount"]);
  });

  test("gets unmounted when removed from an entity", () => {
    const [component, events, clearEvents] = createSpyComponent();
    const entity = new Entity([component]);
    clearEvents();
    entity.components.remove(component);
    expect(events).toEqual(["unmount"]);
  });

  describe("gets remounted", () => {
    test("when owner entity changes parent", () => {
      const [component, events, clearEvents] = createSpyComponent();

      const owner = new Entity([component]);
      const parent1 = new Entity();
      owner.setParent(parent1);

      clearEvents();
      owner.setParent(new Entity());

      expect(events.slice(-2)).toEqual(["unmount", "mount"]);
    });

    test("when owner entity is removed from their parent", () => {
      const [component, events, clearEvents] = createSpyComponent();

      const owner = new Entity([component]);
      new Entity([], [owner]);

      clearEvents();
      owner.remove();
      expect(events.slice(-2)).toEqual(["unmount", "mount"]);
    });

    test("when owner entity ancestry changes", () => {
      const [component, events, clearEvents] = createSpyComponent();

      const owner = new Entity([component]);
      const parent = new Entity([], [owner]);
      new Entity([], [parent]);

      clearEvents();
      parent.setParent(new Entity());
      expect(events.slice(-2)).toEqual(["unmount", "mount"]);
    });

    test("when owner entity.parent is removed from their parent", () => {
      const [component, events, clearEvents] = createSpyComponent();

      const owner = new Entity([component]);
      new Entity([], [owner]);

      clearEvents();
      owner.remove();
      expect(events.slice(-2)).toEqual(["unmount", "mount"]);
    });
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

function createSpyComponent() {
  const events: Array<"mount" | "unmount"> = [];
  const component = new Component().configure({
    mount: () => {
      events.push("mount");
      return () => {
        events.push("unmount");
      };
    },
  });
  const clearEvents = () => events.splice(0, events.length);
  return [component, events, clearEvents] as const;
}
