import { ObservableArray } from "./ObservableArray";

describe("Overloads emit the proper change event for their operation", () => {
  test("push", () => {
    const obs = new ObservableArray(1, 2, 3);
    let added: number[] = [];
    obs.events.on("change", (a) => (added = a));
    obs.push(4, 5, 6);
    expect(added).toEqual([4, 5, 6]);
  });

  test("pop", () => {
    const obs = new ObservableArray(1, 2, 3);
    let removed: number[] = [];
    obs.events.on("change", (a, r) => (removed = r));
    obs.pop();
    expect(removed).toEqual([3]);
  });

  test("splice", () => {
    const obs = new ObservableArray(1, 2, 3);
    let added: number[] = [];
    let removed: number[] = [];
    obs.events.on("change", (a, r) => {
      added = a;
      removed = r;
    });
    obs.splice(1, 2, 5, 6, 7);
    expect(added).toEqual([5, 6, 7]);
    expect(removed).toEqual([2, 3]);
  });

  test("shift", () => {
    const obs = new ObservableArray(1, 2, 3);
    let removed: number[] = [];
    obs.events.on("change", (a, r) => (removed = r));
    obs.shift();
    expect(removed).toEqual([1]);
  });

  test("unshift", () => {
    const obs = new ObservableArray(1, 2, 3);
    let added: number[] = [];
    obs.events.on("change", (a) => (added = a));
    obs.unshift(4, 5, 6);
    expect(added).toEqual([4, 5, 6]);
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
