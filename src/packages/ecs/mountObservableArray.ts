import { ObservableArray } from "./ObservableArray";
import { connectObservableArray } from "./connectObservableArray";

export function mountObservableArray<T>(
  obs: ObservableArray<T>,
  onMount: OnMount<T>
) {
  const mounted = new Map<T, OnUnmount>();
  const tryUnmount = (item: T) => {
    const onUnmount = mounted.get(item);
    if (onUnmount) {
      onUnmount();
      mounted.delete(item);
    }
  };
  const mount = (item: T) => {
    tryUnmount(item);
    const onUnmount = onMount(item);
    if (onUnmount) {
      mounted.set(item, onUnmount);
    }
  };

  return connectObservableArray(obs, (added, removed) => {
    added.forEach(mount);
    removed.forEach(tryUnmount);
  });
}

export type OnMount<T> = (item: T) => OnUnmount | undefined | void;
export type OnUnmount = () => unknown;
