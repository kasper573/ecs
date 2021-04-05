import { ObservableArray, ObservableArrayEvents } from "./ObservableArray";
import { connectObservableArray } from "./connectObservableArray";
import { mountObservableArray, OnMount } from "./mountObservableArray";

export class Container<T> extends ObservableArray<T> {
  remove(...toRemove: T[]) {
    for (const item of toRemove) {
      const index = this.indexOf(item);
      if (index !== -1) {
        this.splice(index, 1);
      }
    }
  }

  filterType<C extends T>(type: Class<C>) {
    return this.filter((item) => item instanceof type) as C[];
  }

  findType<C extends T>(type: Class<C>) {
    return this.find((item) => item instanceof type) as C | undefined;
  }

  resolveType<C extends T>(type: Class<C>) {
    const instance = this.findType(type);
    if (!instance) {
      throw new Error(`Could not resolve instance of ${type.name}`);
    }
    return instance;
  }

  clear() {
    this.splice(0, this.length);
  }

  connect(handleChange: ObservableArrayEvents<T>["change"]) {
    return connectObservableArray(this, handleChange);
  }

  mount(onMount: OnMount<T>) {
    return mountObservableArray(this, onMount);
  }
}

export type Class<T> = new (...args: any[]) => T;
