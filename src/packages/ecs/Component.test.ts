import * as zod from "zod";
import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("declarative component property can derive from their associated entity", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: ({ entity }) => `Derived from ${entity.name}`,
    });

  const componentA = createComponent();
  const componentB = createComponent();

  new Entity([componentA], "entity A");
  new Entity([componentB], "entity B");

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
      text: ({ system }) => `Derived ${system.modules.length}`,
    });

  const componentA = createComponent();
  new System({
    entities: [new Entity([componentA])],
    modules: [{}],
  });

  const componentB = createComponent();
  new System({
    entities: [new Entity([componentB])],
    modules: [{}, {}],
  });

  expect(componentA.text).toEqual("Derived 1");
  expect(componentB.text).toEqual("Derived 2");
});

const TestComponent = Component.extend({
  text: { type: zod.string(), defaultValue: "" },
});
