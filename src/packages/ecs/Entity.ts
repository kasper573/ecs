import { uuid } from "../ecs-common/uuid";
import { ComponentInstance } from "./Component";
import { System } from "./System";
import { Container, getFrozenContainer } from "./Container";
import { descendants } from "./descendants";
import { createMount } from "./createMount";
import { isOrHasAncestor } from "./isOrHasAncestor";

export class Entity<Id extends string = string> implements EntityOptions<Id> {
  isActive: boolean = true;

  name: string;
  readonly id: Id;

  private _isDisposed = false;
  private _parent?: Entity<Id>;
  private _system?: System;
  private _childrenById = {} as Record<Id, Entity<Id>>;

  get isDisposed() {
    return this._isDisposed;
  }

  get parent() {
    return this._parent;
  }

  get system() {
    return this._system;
  }

  get childrenById(): Readonly<Record<Id, Entity<Id>>> {
    return this._childrenById;
  }

  get activeDescendants() {
    return descendants(this, (e) => e.isActive);
  }

  get descendants() {
    return descendants(this);
  }

  get descendantsAndSelf() {
    return descendants(this, undefined, true);
  }

  get children() {
    return this._children;
  }

  get components() {
    return this._components;
  }

  private _children = new Container<Entity<Id>>();
  private _components = new Container<ComponentInstance>();
  private readonly observations: Function[] = [];
  private readonly componentMounts = createMount<ComponentInstance>();

  dispose() {
    if (this._isDisposed) {
      return;
    }

    // Unmount all components first
    // (since their unmount operation may still need the entity/system references we're about to dispose)
    this.unmountComponents();
    this.components.clear();

    // Dispose and clear children
    for (const child of this.children) {
      child.dispose();
    }
    this.children.clear();

    // Remove from parent
    this.remove();

    // Stop observations
    while (this.observations.length) {
      const stop = this.observations.shift()!;
      stop();
    }

    // Lock further usage of this instance
    this._isDisposed = true;
    this._components = getFrozenContainer(this._components);
    this._children = getFrozenContainer(this._children);
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
        this.componentMounts.mount(component, component.mount);
        return () => {
          this.componentMounts.unmount(component);
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

    if (newParent && isOrHasAncestor(newParent, this)) {
      throw new Error("Circular entity structures not allowed");
    }

    const didRemove = this.remove(false);
    this._parent = newParent;

    if (newParent && !newParent.children.includes(this)) {
      newParent.children.push(this);
    }

    if (this._system !== newParent?.system) {
      this._system = newParent?.system;
      for (const descendant of this.descendants) {
        descendant._system = this._system;
      }
    }

    if (didRemove || newParent) {
      this.mountComponents();
    }
  }

  remove(remountComponents = true) {
    if (this.parent?.children.includes(this)) {
      if (remountComponents) {
        this.mountComponents(); // Remount to tell components the associated entity tree is changing
      }
      this.parent?.children.remove(this);
      return true;
    }
    return false;
  }

  private mountComponents() {
    for (const component of entityComponents(this.descendantsAndSelf)) {
      if (component.entity) {
        component.entity.componentMounts.mount(component, component.mount);
      }
    }
  }

  private unmountComponents() {
    for (const component of entityComponents(this.descendantsAndSelf)) {
      if (component.entity) {
        component.entity.componentMounts.unmount(component);
      }
    }
  }
}

function* entityComponents(entities: Iterable<Entity>) {
  for (const entity of entities) {
    for (const component of entity.components) {
      yield component;
    }
  }
}

export type EntityOptions<Id extends string> = {
  readonly name: string;
  readonly id: Id;
  system?: System;
};
