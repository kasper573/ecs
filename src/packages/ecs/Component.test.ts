import * as zod from "zod";
import { InstanceOf } from "../property-bag/types/PropertyBagInstance";
import { Entity } from "./Entity";
import { Component } from "./Component";
import { System } from "./System";

test("declarative component property can derive from their associated entity", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: (({ entity }: { entity: Entity }) =>
        `Derived from ${entity.name}`) as any,
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
      text: (({ component }: { component: InstanceOf<typeof TestComponent> }) =>
        `Derived from ${component.name}`) as any,
    });

  const componentA = createComponent();
  componentA.configure({ name: "component A" });
  const componentB = createComponent();
  componentB.configure({ name: "component B" });

  expect(componentA.text).toEqual("Derived from component A");
  expect(componentB.text).toEqual("Derived from component B");
});

test("declarative component property can derive from their associated system", () => {
  const createComponent = () =>
    new TestComponent().configure({
      text: (({ system }: { system: System }) =>
        `Derived ${system.modules.length}`) as any,
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
  name: { type: zod.string(), defaultValue: "" },
  text: { type: zod.string(), defaultValue: "" },
});
