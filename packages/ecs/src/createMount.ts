import { combine } from "../../ecs-common/src/combine";

export const createMount = <T>(onAnyMount?: OnMount<T>) => {
  const mounts = new Map<T, OnMount<T>>();
  const unmounts = new Map<T, OnUnmount<T>>();

  const unmount = (item: T) => {
    const onUnmount = unmounts.get(item);
    if (onUnmount) {
      onUnmount(item);
      mounts.delete(item);
      unmounts.delete(item);
    }
  };

  const mount = (item: T, onMount?: OnMount<T>) => {
    const remount = mounts.get(item);
    unmount(item);
    const newMount = onMount ?? remount;
    if (newMount) {
      mounts.set(item, newMount);
    }
    const combinedMount = combine(newMount, onAnyMount);
    const onCombinedUnmount = combinedMount ? combinedMount(item) : undefined;
    if (onCombinedUnmount) {
      unmounts.set(item, onCombinedUnmount);
    }
  };

  return { mount, unmount };
};

export type OnMount<T> = (item: T) => OnUnmount<T> | undefined | void;

export type OnUnmount<T> = (item: T) => unknown;
