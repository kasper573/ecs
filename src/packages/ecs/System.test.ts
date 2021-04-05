import { Entity } from "./Entity";
import { System } from "./System";
import { Component } from "./Component";

test("system entries can be configured by an array of entities", () => {
  const a = new Entity();
  const b = new Entity();
  const system = new System(a, b);
  expect(system.active.length).toBe(2);
  expect(system.active).toEqual(expect.arrayContaining([a, b]));
});

test("system.entities is a flat list of the entity hierarchy", () => {
  const c = new Entity();
  const b = new Entity();
  b.children.push(c);
  const a = new Entity();
  a.children.push(b);

  const system = new System(a);
  expect(system.active.length).toBe(3);
  expect(system.active).toEqual(expect.arrayContaining([a, b, c]));
});

test("inactive leaf entries are not included in system.entities", () => {
  const c = new Entity([], [], { name: "C" });
  const b = new Entity([], [], { name: "B" });
  b.children.push(c);
  const a = new Entity([], [], { name: "A" });
  a.children.push(b);
  c.isActive = false;

  const system = new System(a);
  expect(system.active.length).toBe(2);
  expect(system.active).toEqual(expect.arrayContaining([a, b]));
});

test("inactive leaf entries are included in system.allEntities", () => {
  const c = new Entity([], [], { name: "C" });
  const b = new Entity([], [], { name: "B" });
  b.children.push(c);
  const a = new Entity([], [], { name: "A" });
  a.children.push(b);
  c.isActive = false;

  const system = new System(a);
  expect(system.all.length).toBe(3);
  expect(system.all).toEqual(expect.arrayContaining([a, b, c]));
});

test("inactive entry sub trees are not included in system.entities", () => {
  const c = new Entity();
  const b = new Entity();
  b.children.push(c);
  const a = new Entity();
  a.children.push(b);
  b.isActive = false;

  const system = new System(a);
  expect(system.active.length).toBe(1);
  expect(system.active).toEqual(expect.arrayContaining([a]));
});

test("inactive entry sub trees are included in system.allEntities", () => {
  const c = new Entity();
  const b = new Entity();
  b.children.push(c);
  const a = new Entity();
  a.children.push(b);
  b.isActive = false;

  const system = new System(a);
  expect(system.all.length).toBe(3);
  expect(system.all).toEqual(expect.arrayContaining([a, b, c]));
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
      const b = new Entity();
      const a = new Entity([], [b]);
      const system = new System();
      expect(b.system).toBe(undefined);
      system.root.children.push(a);
      expect(b.system).toBe(system);
    });

    it("is unset for removed", () => {
      const b = new Entity();
      const a = new Entity([], [b]);
      const system = new System(a);
      expect(b.system).toBe(system);
      system.root.children.remove(a);
      expect(b.system).toBe(undefined);
    });
  });
});
