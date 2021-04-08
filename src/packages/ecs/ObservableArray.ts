import { EventEmitter } from "events";
import TypedEmitter from "typed-emitter";

export class ObservableArray<T> extends Array<T> {
  readonly events: TypedEmitter<ObservableArrayEvents<T>> = new EventEmitter();

  push(...added: T[]): number {
    const result = super.push(...added);
    this.events.emit("change", added, empty);
    return result;
  }

  pop(): T | undefined {
    const lengthBefore = this.length;
    const removed = super.pop();
    if (this.length !== lengthBefore) {
      this.events.emit("change", empty, [removed!]);
    }
    return removed;
  }

  splice(start: number, deleteCount: number, ...items: T[]): T[] {
    const removed = super.splice(start, deleteCount, ...items);
    if (removed.length) {
      this.events.emit("change", items, removed);
    }
    return removed;
  }

  shift(): T | undefined {
    const lengthBefore = this.length;
    const removed = super.shift();
    if (this.length !== lengthBefore) {
      this.events.emit("change", empty, [removed!]);
    }
    return removed;
  }

  unshift(...added: T[]): number {
    const result = super.unshift(...added);
    this.events.emit("change", added, empty);
    return result;
  }
}

const empty = Object.freeze([]);

export type ObservableArrayEvents<T> = {
  change: (added: readonly T[], removed: readonly T[]) => void;
};
