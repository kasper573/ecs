import { uuid } from "../ecs-common/uuid";
import { ComponentInstance } from "./Component";
import { System } from "./System";
import { Container } from "./Container";
import { descendants } from "./descendants";

export class Entity<Id extends string = string> implements EntityOptions<Id> {
  isActive: boolean = true;

  name: string;
  readonly id: Id;

  private _parent?: Entity<Id>;
  private _system?: System;
  private _childrenById = {} as Record<Id, Entity<Id>>;

  get parent() {
    return this._parent;
  }

  get system() {
    return this._system;
  }

  get childrenById(): Readonly<Record<Id, Entity<Id>>> {
    return this._childrenById;
  }

  readonly children = new Container<Entity<Id>>();
  readonly components = new Container<ComponentInstance>();
  readonly observations: Function[] = [];

  dispose() {
    if (this.parent) {
      this.parent.children.remove(this);
    }
    this.components.clear();
    this.children.clear();
    for (const stop of this.observations) {
      stop();
    }
  }

  constructor(
    components?: ComponentInstance[],
    children?: Entity<Id>[],
    options: Partial<EntityOptions<Id>> = {}
  ) {
    this.id = options.id ?? uuid();
    this.name = options.name ?? "";
    this._system = options.system;

    this.observations = [
      this.components.mount((component) => {
        component.configure({ entity: this });
        const unmountComponent = component.mount();
        return () => {
          if (unmountComponent) {
            unmountComponent();
          }
          component.configure({ entity: undefined });
        };
      }),

      this.children.mount((child) => {
        child.setParent(this);
        return () => child.setParent(undefined);
      }),

      this.children.connect((added, removed) => {
        const updatedMap = { ...this._childrenById };
        for (const child of added) {
          updatedMap[child.id] = child;
        }
        for (const child of removed) {
          delete updatedMap[child.id];
        }
        this._childrenById = updatedMap;
      }),
    ];

    if (components) {
      this.components.push(...components);
    }
    if (children) {
      this.children.push(...children);
    }
  }

  toString() {
    return this.name;
  }

  setParent(newParent?: Entity<Id>) {
    if (this.parent === newParent) {
      return;
    }
    if (this.parent) {
      this.parent.children.remove(this);
    }
    this._parent = newParent;
    if (newParent) {
      if (!newParent.children.includes(this)) {
        newParent.children.push(this);
      }
    }
    if (this._system !== newParent?.system) {
      this._system = newParent?.system;
      for (const descendant of Array.from(descendants(this))) {
        descendant._system = this._system;
      }
    }
  }
}

export type EntityOptions<Id extends string> = {
  readonly name: string;
  readonly id: Id;
  system?: System;
};
