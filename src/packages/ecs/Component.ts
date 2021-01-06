import { Entity } from "./Entity";

export class Component<
  TEntity,
  Options extends ComponentOptions = ComponentOptions
> {
  // @ts-ignore
  entity: TEntity extends Entity<any> ? TEntity : never;

  defaultActive: boolean = true;

  constructor(protected options: Resolvable<Options> = {}) {}

  isActive() {
    return this.resolveOption("isActive", this.defaultActive);
  }

  update() {
    if (this.options.update) {
      this.options.update();
    }
  }

  protected resolveOption<K extends keyof Options>(
    key: K,
    defaultValue: Options[K]
  ): Options[K] {
    return resolveOption(this.options, key, defaultValue);
  }
}

export type ComponentOptions = {
  isActive: boolean;
  update: () => void | undefined;
};

type Resolvable<T> = {
  [K in keyof T]?: T[K] extends (...args: any) => any
    ? T[K]
    : T[K] | (() => T[K]);
};

function resolveOption<T, K extends keyof T>(
  options: Resolvable<T>,
  key: K,
  defaultValue: T[K]
): T[K] {
  const value = options[key];
  if (typeof value === "function") {
    return value();
  }
  return (value as T[K]) ?? defaultValue;
}
