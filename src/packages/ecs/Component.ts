import { Entity } from "./Entity";
import { Resolvable, resolve } from "./Resolvable";
import { trustedUndefined } from "./trustedUndefined";

export class Component<
  TEntity,
  Options extends ComponentOptions = ComponentOptions
> {
  entity: TEntity extends Entity ? TEntity : never = trustedUndefined();

  public options: Partial<Options> = {};

  constructor(options: Partial<Options> = {}) {
    this.options.isActiveDefault = true;
    this.options = { ...this.options, ...options };
  }

  get isActive() {
    return resolve(this.options.isActive) ?? this.options.isActiveDefault;
  }

  update() {
    if (this.options.update) {
      this.options.update();
    }
  }
}

export type ComponentOptions = {
  isActiveDefault: boolean;
  isActive: Resolvable<boolean>;
  update: () => void | undefined;
};
