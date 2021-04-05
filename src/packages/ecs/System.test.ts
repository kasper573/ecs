import { Entity } from "./Entity";
import { System } from "./System";
import { Component } from "./Component";

test("system entries can be configured by an array of entities", () => {
  const a = new Entity();
  const b = new Entity();
  const system = new System(a, b);
  expect(system.entities.length).toBe(2);
  expect(system.entities).toEqual(expect.arrayContaining([a, b]));
});

test("system.entities is a flat list of the entity hierarchy", () => {
  const c = new Entity();
  const b = new Entity();
  b.children.push(c);
  const a = new Entity();
  a.children.push(b);

  const system = new System(a);
  expect(system.entities.length).toBe(3);
  expect(system.entities).toEqual(expect.arrayContaining([a, b, c]));
});

test("inactive leaf entries are not included in system.entities", () => {
  const c = new Entity([], [], "C");
  const b = new Entity([], [], "B");
  b.children.push(c);
  const a = new Entity([], [], "A");
  a.children.push(b);
  c.isActive = false;

  const system = new System(a);
  expect(system.entities.length).toBe(2);
  expect(system.entities).toEqual(expect.arrayContaining([a, b]));
});

test("inactive entry sub trees are not included in system.entities", () => {
  const c = new Entity();
  const b = new Entity();
  b.children.push(c);
  const a = new Entity();
  a.children.push(b);
  b.isActive = false;

  const system = new System(a);
  expect(system.entities.length).toBe(1);
  expect(system.entities).toEqual(expect.arrayContaining([a]));
});

test("components get updated once on system initialization", () => {
  let componentUpdates = 0;
  const createComponent = () =>
    new Component({
      update: () => {
        componentUpdates++;
      },
    });
  new System(
    new Entity([createComponent(), createComponent()]),
    new Entity([createComponent(), createComponent()])
  );
  expect(componentUpdates).toBe(4);
});

test("components get updated once per system update", () => {
  let componentUpdates = 0;
  const createComponent = () =>
    new Component({
      update: () => {
        componentUpdates++;
      },
    });
  const system = new System(
    new Entity([createComponent(), createComponent()]),
    new Entity([createComponent(), createComponent()])
  );
  componentUpdates = 0;
  system.update();
  expect(componentUpdates).toBe(4);
});

describe("system reference", () => {
  describe("for root entities", () => {
    it("is set for initializers", () => {
      const a = new Entity();
      const b = new Entity();
      const system = new System(a, b);
      expect(a.system).toBe(system);
      expect(b.system).toBe(system);
    });

    it("is set for added", () => {
      const system = new System();
      const a = new Entity();
      expect(a.system).toBe(undefined);
      system.root.children.push(a);
      expect(a.system).toBe(system);
    });

    it("is unset for removed", () => {
      const a = new Entity();
      const system = new System(a);
      expect(a.system).toBe(system);
      system.root.children.remove(a);
      expect(a.system).toBe(undefined);
    });
  });

  describe("for sub tree entities", () => {
    it("is set for initializers", () => {
      const b = new Entity();
      const a = new Entity([], [b]);
      const system = new System(a);
      expect(a.system).toBe(system);
      expect(b.system).toBe(system);
    });

    it("is set for added", () => {
      const a = new Entity();
      const system = new System(a);
      const b = new Entity();
      expect(b.system).toBe(undefined);
      a.children.push(b);
      expect(b.system).toBe(system);
    });

    it("is unset for removed", () => {
      const b = new Entity();
      const a = new Entity([], [b]);
      const system = new System(a);
      expect(b.system).toBe(system);
      a.children.remove(b);
      expect(b.system).toBe(undefined);
    });
  });
});
