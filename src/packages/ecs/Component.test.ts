import * as zod from "zod";
import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("Component gets mounted when added to an entity", () => {
  let mounted = false;
  const component = new Component().configure({
    mount: () => {
      mounted = true;
    },
  });

  new Entity([component]);
  expect(mounted).toEqual(true);
});

test("Component gets unmounted when removed from an entity", () => {
  let unmounted = false;
  const component = new Component().configure({
    mount: () => () => {
      unmounted = true;
    },
  });

  const entity = new Entity([component]);
  entity.components.remove(component);
  expect(unmounted).toEqual(true);
});

test("declarative component property can derive from their associated entity", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: ({ entity }) => `Derived from ${entity?.name}`,
    });

  const componentA = createComponent();
  const componentB = createComponent();

  new Entity([componentA], [], { name: "entity A" });
  new Entity([componentB], [], { name: "entity B" });

  expect(componentA.text).toEqual("Derived from entity A");
  expect(componentB.text).toEqual("Derived from entity B");
});

test("declarative component property can derive from their associated component", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: ({ component }) => `Derived from ${component.id}`,
    });

  const componentA = createComponent();
  componentA.configure({ id: "component A" });
  const componentB = createComponent();
  componentB.configure({ id: "component B" });

  expect(componentA.text).toEqual("Derived from component A");
  expect(componentB.text).toEqual("Derived from component B");
});

test("declarative component property can derive from their associated system", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: ({ system }) => {
        const first = system?.entities[0];
        return `Derived ${first?.name}`;
      },
    });

  const componentA = createComponent();
  new System(new Entity([componentA], [], { name: "A" }));

  const componentB = createComponent();
  new System(new Entity([componentB], [], { name: "B" }));

  expect(componentA.text).toEqual("Derived A");
  expect(componentB.text).toEqual("Derived B");
});

const TestComponent = Component.extend({
  text: { type: zod.string(), defaultValue: "" },
});
