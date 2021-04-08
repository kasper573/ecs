import { ObservableArray } from "./ObservableArray";

describe("Overloads emit the proper change event for their operation", () => {
  test("push(unique values)", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a);
    let added: ReadonlyArray<object> = [];
    obs.events.on("change", (items) => (added = items));
    obs.push(b, c);
    expectArrayItemsToBe(added, [b, c]);
  });

  test("push(duplicate values)", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a, b, c);
    let added: ReadonlyArray<object> = [];
    obs.events.on("change", (items) => (added = items));
    obs.push(b, c, b);
    expectArrayItemsToBe(added, [b, c, b]);
  });

  test("pop", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a, b, c);
    let removed: ReadonlyArray<object> = [];
    obs.events.on("change", (add, rem) => (removed = rem));
    obs.pop();
    expectArrayItemsToBe(removed, [c]);
  });

  test("splice", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a, b, c);
    let added: ReadonlyArray<object> = [];
    let removed: ReadonlyArray<object> = [];
    obs.events.on("change", (add, rem) => {
      added = add;
      removed = rem;
    });
    const d = {};
    const e = {};
    obs.splice(1, 2, d, e);
    expectArrayItemsToBe(added, [d, e]);
    expectArrayItemsToBe(removed, [b, c]);
  });

  test("unshift(unique values)", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a);
    let added: ReadonlyArray<object> = [];
    obs.events.on("change", (items) => (added = items));
    obs.unshift(b, c);
    expectArrayItemsToBe(added, [b, c]);
  });

  test("unshift(duplicate values)", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a, b, c);
    let added: ReadonlyArray<object> = [];
    obs.events.on("change", (items) => (added = items));
    obs.unshift(b, c, b);
    expectArrayItemsToBe(added, [b, c, b]);
  });

  test("shift", () => {
    const a = {};
    const b = {};
    const c = {};
    const obs = new ObservableArray(a, b, c);
    let removed: ReadonlyArray<object> = [];
    obs.events.on("change", (add, rem) => (removed = rem));
    obs.shift();
    expectArrayItemsToBe(removed, [a]);
  });
});

describe("Overloads still perform underlying Array functionality", () => {
  test("push", () => {
    const obs = new ObservableArray(1, 2, 3);
    obs.push(4, 5, 6);
    expect(Array.from(obs)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("pop", () => {
    const obs = new ObservableArray(1, 2, 3);
    obs.pop();
    expect(Array.from(obs)).toEqual([1, 2]);
  });

  test("splice", () => {
    const obs = new ObservableArray(1, 2, 3, 4);
    const spliced = obs.splice(1, 2);
    expect(Array.from(spliced)).toEqual([2, 3]);
    expect(Array.from(obs)).toEqual([1, 4]);
  });

  test("shift", () => {
    const obs = new ObservableArray(1, 2, 3);
    obs.shift();
    expect(Array.from(obs)).toEqual([2, 3]);
  });

  test("unshift", () => {
    const obs = new ObservableArray(1, 2, 3);
    obs.unshift(4, 5, 6);
    expect(Array.from(obs)).toEqual([4, 5, 6, 1, 2, 3]);
  });
});

function expectArrayItemsToBe<T>(array: readonly T[], be: readonly T[]) {
  expect(array.length).toEqual(be.length);
  for (let i = 0; i < array.length; i++) {
    expect(array[i]).toBe(be[i]);
  }
}
