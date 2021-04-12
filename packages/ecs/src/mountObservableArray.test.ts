import { ObservableArray } from "./ObservableArray";
import { mountObservableArray } from "./mountObservableArray";

test("mount is called on add", () => {
  let mounted: string[] = [];
  const obs = new ObservableArray<string>("initA", "initB");
  mountObservableArray(obs, (value) => {
    mounted.push(value);
  });
  mounted = [];
  obs.push("addA", "addB");
  expect(mounted).toEqual(["addA", "addB"]);
});

test("unmount is called on remove", () => {
  const unmounted: string[] = [];
  const obs = new ObservableArray<string>("initA", "initB", "initC");
  mountObservableArray(obs, (value) => () => {
    unmounted.push(value);
  });
  obs.splice(0, 2);
  expect(unmounted).toEqual(["initA", "initB"]);
});

test("mount is called for initial items", () => {
  const mounted: string[] = [];
  mountObservableArray(
    new ObservableArray<string>("initA", "initB"),
    (value) => {
      mounted.push(value);
    }
  );
  expect(mounted).toEqual(["initA", "initB"]);
});

test("unmount is called for remaining items on observation stop", () => {
  let unmounted: string[] = [];
  const obs = new ObservableArray<string>("initA", "initB");
  const stop = mountObservableArray(obs, (value) => () => {
    unmounted.push(value);
  });
  obs.splice(0, 1);
  unmounted = [];
  stop();
  expect(unmounted).toEqual(["initB"]);
});
