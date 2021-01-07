import { Entity } from "./Entity";
import { Resolvable, resolve } from "./Resolvable";

export class Component<
  TEntity,
  Options extends ComponentOptions = ComponentOptions
> {
  // @ts-ignore
  entity: TEntity extends Entity<any> ? TEntity : never;

  isActiveDefault: boolean = true;

  constructor(protected options: Partial<Options> = {}) {}

  get isActive() {
    return resolve(this.options.isActive) ?? this.isActiveDefault;
  }

  update() {
    if (this.options.update) {
      this.options.update();
    }
  }
}

export type ComponentOptions = {
  isActive: Resolvable<boolean>;
  update: () => void | undefined;
};
