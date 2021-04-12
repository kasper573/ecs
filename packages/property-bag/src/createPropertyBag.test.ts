import * as zod from "zod";
import { createPropertyBag } from "./createPropertyBag";

test("can set default value of custom property", () => {
  const Bag = createPropertyBag({
    foo: { type: zod.number(), defaultValue: 123 },
  });
  const instance = new Bag();
  expect(instance.foo).toBe(123);
});

test("can set initial value of custom property", () => {
  const FC = createPropertyBag({
    foo: { type: zod.number(), defaultValue: 123 },
  });
  const instance = new FC({ foo: 321 });
  expect(instance.foo).toBe(321);
});

test("can set value of custom property", () => {
  const Bag = createPropertyBag({
    foo: { type: zod.number(), defaultValue: 123 },
  });
  const instance = new Bag({ foo: 321 });
  instance.configure({ foo: 500 });
  expect(instance.foo).toBe(500);
});

test("can reset to default value of custom property", () => {
  const Bag = createPropertyBag({
    foo: { type: zod.number().optional(), defaultValue: 123 },
  });
  const instance = new Bag({ foo: 321 });
  instance.reset("foo");
  expect(instance.foo).toBe(123);
});

test("can resolve primitive property initialized as function", () => {
  const FC = createPropertyBag({
    foo: { type: zod.number().optional(), defaultValue: 123 },
  });
  const instance = new FC({ foo: () => 321 });
  expect(instance.foo).toBe(321);
});

test("can resolve primitive property configured as function", () => {
  const FC = createPropertyBag({
    foo: { type: zod.number().optional(), defaultValue: 123 },
  });
  const instance = new FC();
  instance.configure({ foo: () => 321 });
  expect(instance.foo).toBe(321);
});

test("does not resolve function property", () => {
  const FC = createPropertyBag({
    foo: { type: zod.function(), defaultValue: () => {} },
  });
  const instance = new FC();
  instance.configure({ foo: () => 123 });
  expect(instance.foo).not.toBe(123);
});

test("does not resolve optional function property", () => {
  const FC = createPropertyBag({
    foo: { type: zod.function().optional(), defaultValue: () => {} },
  });
  const instance = new FC();
  instance.configure({ foo: () => 123 });
  expect(instance.foo).not.toBe(123);
});

test("returns initialized function property value as is", () => {
  const FC = createPropertyBag({
    foo: { type: zod.function(), defaultValue: () => {} },
  });
  const func = () => 123;
  const instance = new FC({ foo: func });
  expect(instance.foo).toBe(func);
});

test("returns configured function property value as is", () => {
  const FC = createPropertyBag({
    foo: { type: zod.function().optional(), defaultValue: () => {} },
  });
  const func = () => 123;
  const instance = new FC();
  instance.configure({ foo: func });
  expect(instance.foo).toBe(func);
});

test("bag exposes runtime property information", () => {
  const props = {
    foo: { type: zod.number(), defaultValue: 123 },
  };
  const FC = createPropertyBag(props);
  expect(FC.propertyInfos).toEqual(props);
});

test("bag supports polymorphism", () => {
  const Base = createPropertyBag({
    foo: { type: zod.number(), defaultValue: 1 },
  });
  const Ext = Base.extend({
    bar: { type: zod.string(), defaultValue: "1" },
  });
  class Super extends Ext {}
  const instance = new Super();
  expect(instance instanceof Base).toBe(true);
  expect(instance.foo).toBe(1);
  expect(instance.bar).toBe("1");
  instance.configure({ foo: 2, bar: "2" });
  expect(instance.foo).toBe(2);
  expect(instance.bar).toBe("2");
  instance.configure({ foo: () => 3, bar: () => "3" });
  expect(instance.foo).toBe(3);
  expect(instance.bar).toBe("3");
});
