import { ObservableArrayEvents } from "./ObservableArray";
import { connectObservableArray } from "./connectObservableArray";
import { mountObservableArray } from "./mountObservableArray";
import { TypeCollection } from "./TypeCollection";
import { OnMount } from "./createMount";

export class Container<T> extends TypeCollection<T> {
  remove(...toRemove: T[]) {
    for (const item of toRemove) {
      const index = this.indexOf(item);
      if (index !== -1) {
        this.splice(index, 1);
      }
    }
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

export const getFrozenContainer = <T extends Container<any>>(c: T): T =>
  Object.freeze(new Container(...c)) as T;
