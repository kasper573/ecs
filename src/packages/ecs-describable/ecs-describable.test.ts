import { World } from "../ecs/World";
import { Entity } from "../ecs/Entity";
import { Describable } from "./Describable";
import { describeWorld } from "./describeWorld";
import { Interactive } from "../ecs-interactive/Interactive";

test("Describable entities are presented as text", () => {
  const entity = new Entity("entity", {}, () => [
    new Describable({ describe: () => "A visible entity" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual("A visible entity");
});

test("Actions are presented as a text list", () => {
  const entity = new Entity("entity", {}, () => [
    new Interactive({ action: () => "Foo" }),
    new Interactive({ action: () => "Bar" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});

test("Effects are presented as a text above all other text output", () => {
  const entity = new Entity("entity", {}, () => [
    new Interactive({ action: () => "Foo" }),
    new Interactive({ action: () => "Bar" }),
  ]);
  expect(describeWorld(new World([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});
