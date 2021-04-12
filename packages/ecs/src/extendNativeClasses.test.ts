it("can initialize extended Map", () => {
  expect(() => new ExtendedMap()).not.toThrow();
});

it("can use extended interface for extended Map", () => {
  expect(new ExtendedMap().two("a")).toEqual(["a", "a"]);
});

it("can initialize extended Array", () => {
  expect(() => new ExtendedArray()).not.toThrow();
});

it("can use extended interface for extended Array", () => {
  expect(new ExtendedArray().two("b")).toEqual(["b", "b"]);
});

class ExtendedArray<T> extends Array<T> {
  two(one: T) {
    return [one, one] as const;
  }
}

class ExtendedMap<T> extends Map {
  two(one: T) {
    return [one, one] as const;
  }
}
