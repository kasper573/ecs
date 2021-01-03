import { World } from "../ecs/World";
import { Entity } from "../ecs/Entity";
import { Component } from "../ecs/Component";
import { Describable } from "./Describable";
import { describeWorld } from "./describeWorld";

test("Describable entities are presented as text", () => {
  const entity = new Entity("entity", {}, () => [
    new Describable({ describe: () => "A visible entity" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual("A visible entity");
});

test("Actions are presented as a text list", () => {
  const entity = new Entity("entity", {}, () => [
    new Component({ action: () => "Foo" }),
    new Component({ action: () => "Bar" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});

test("Effects are presented as a text above all other text output", () => {
  const entity = new Entity("entity", {}, () => [
    new Component({ action: () => "Foo" }),
    new Component({ action: () => "Bar" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});
