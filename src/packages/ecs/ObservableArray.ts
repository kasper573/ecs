import { EventEmitter } from "events";
import { without } from "lodash";
import TypedEmitter from "typed-emitter";

export class ObservableArray<T> extends Array<T> {
  readonly events: TypedEmitter<ObservableArrayEvents<T>> = new EventEmitter();

  push(...items: T[]): number {
    return automateEvents(() => super.push(...items), this);
  }

  pop(): T | undefined {
    return automateEvents(() => super.pop(), this);
  }

  splice(start: number, deleteCount: number, ...items: T[]): T[] {
    return automateEvents(
      () => super.splice(start, deleteCount, ...items),
      this
    );
  }

  shift(): T | undefined {
    return automateEvents(() => super.shift(), this);
  }

  unshift(...items: T[]): number {
    return automateEvents(() => super.unshift(...items), this);
  }
}

const automateEvents = <F extends (...args: any[]) => any, T>(
  fun: F,
  array: ObservableArray<T>
): ReturnType<F> => {
  const before = [...array];
  const ret = fun();
  const after = [...array];
  const added = without(after, ...before);
  const removed = without(before, ...after);
  array.events.emit("change", added, removed);
  return ret;
};

export type ObservableArrayEvents<T> = {
  change: (added: T[], removed: T[]) => void;
};
