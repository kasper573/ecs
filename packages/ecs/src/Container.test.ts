import { Container } from "./Container";

test("can remove item by reference", () => {
  const a = {};
  const list = new Container(a);
  list.remove(a);
  expect(list).not.toContain(a);
});

test("can find item by type", () => {
  class Type {}
  const list = new Container(new Type());
  expect(list.findType(Type)).toBeInstanceOf(Type);
});

test("can filter items by type", () => {
  class TypeA {}
  class TypeB {}
  const list = new Container(new TypeA(), new TypeB());
  const filtered = list.filterType(TypeA);
  for (const item of filtered) {
    expect(item).toBeInstanceOf(TypeA);
  }
});

test("resolving a missing item type throws error", () => {
  class TypeA {}
  const list = new Container();
  expect(() => list.resolveType(TypeA)).toThrow();
});

test("a required (and existing) item type returns item", () => {
  class TypeA {}
  const list = new Container(new TypeA());
  expect(list.resolveType(TypeA)).toBeInstanceOf(TypeA);
});
