import { connectObservableArray } from "./connectObservableArray";
import { ObservableArray } from "./ObservableArray";

test("emits existing items as added on connect", () => {
  const obs = new ObservableArray(1, 2, 3);
  let emitted: ReadonlyArray<number> = [];
  const disconnect = connectObservableArray(obs, (items) => (emitted = items));
  expect(emitted).toEqual([1, 2, 3]);
  disconnect();
});

test("emits added items", () => {
  const obs = new ObservableArray(1, 2, 3);
  let emitted: ReadonlyArray<number> = [];
  const disconnect = connectObservableArray(obs, (items) => (emitted = items));
  obs.push(4, 5, 6);
  expect(emitted).toEqual([4, 5, 6]);
  disconnect();
});

test("emits removed items", () => {
  const obs = new ObservableArray(1, 2, 3);
  let emitted: ReadonlyArray<number> = [];
  const disconnect = connectObservableArray(
    obs,
    (added, removed) => (emitted = removed)
  );
  obs.pop();
  expect(emitted).toEqual([3]);
  disconnect();
});

test("emits remaining items as removed on disconnect", () => {
  const obs = new ObservableArray(1, 2, 3);
  let emitted: ReadonlyArray<number> = [];
  const disconnect = connectObservableArray(
    obs,
    (added, removed) => (emitted = removed)
  );
  disconnect();
  expect(emitted).toEqual([1, 2, 3]);
});

test("emits no items after disconnecting", () => {
  const obs = new ObservableArray<number>(9, 8, 7);
  let added: ReadonlyArray<number>;
  let removed: ReadonlyArray<number>;

  const disconnect = connectObservableArray(obs, (a, r) => {
    added = a;
    removed = r;
  });
  disconnect();

  added = [];
  removed = [];
  obs.push(1, 2, 3);
  obs.pop();

  expect(added).toEqual([]);
  expect(removed).toEqual([]);
});
