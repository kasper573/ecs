import { ObservableArray } from "./ObservableArray";
import { connectObservableArray } from "./connectObservableArray";
import { createMount, OnMount } from "./createMount";

export function mountObservableArray<T>(
  obs: ObservableArray<T>,
  onMount: OnMount<T>
) {
  const { mount, unmount } = createMount(onMount);
  return connectObservableArray(obs, (added, removed) => {
    for (const item of added) {
      mount(item);
    }
    removed.forEach(unmount);
  });
}
