import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Interactive } from "../ecs-interactive/Interactive";
import { Describable } from "./Describable";
import { describeSystem } from "./describeSystem";

test("Describable entities are presented as text", () => {
  const entity = new Entity("entity", {}, () => [
    new Describable({ describe: () => "A visible entity" }),
  ]);
  expect(describeSystem(new System([entity]))).toEqual("A visible entity");
});

test("Actions are presented as a text list", () => {
  const entity = new Entity("entity", {}, () => [
    new Interactive({ action: () => "Foo" }),
    new Interactive({ action: () => "Bar" }),
  ]);
  expect(describeSystem(new System([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});

test("Effects are presented as a text above all other text output", () => {
  const entity = new Entity("entity", {}, () => [
    new Interactive({ action: () => "Foo" }),
    new Interactive({ action: () => "Bar" }),
  ]);
  expect(describeSystem(new System([entity]))).toEqual(`Actions:
- Foo
- Bar`);
});
