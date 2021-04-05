import { uuid } from "../ecs-common/uuid";
import { ComponentInstance } from "./Component";
import { System } from "./System";
import { Container } from "./Container";
import { descendants } from "./descendants";

export class Entity<Id extends string = string> implements EntityOptions<Id> {
  isActive: boolean = true;

  name: string = "";
  readonly id: Id = uuid();

  private _parent?: Entity<Id>;
  private _system?: System;
  private _childrenById = {} as Record<Id, Entity<Id>>;

  get parent() {
    return this._parent;
  }

  get system() {
    return this._system;
  }

  set system(value: System | undefined) {
    this._system = value;
    for (const entity of Array.from(descendants(this))) {
      entity.system = value;
    }
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
    this.id = options.id ?? this.id;
    this.name = options.name ?? this.name;

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

  private setParent(newParent?: Entity<Id>) {
    if (this.parent) {
      this.parent.children.remove(this);
    }
    this._parent = newParent;
    this.system = newParent?.system;
  }
}

export type EntityOptions<Id extends string> = {
  readonly name: string;
  readonly id: Id;
};
