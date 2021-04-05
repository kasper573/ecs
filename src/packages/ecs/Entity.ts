import { removeNominal } from "../ecs-common/removeNominal";
import { uuid } from "../ecs-common/uuid";
import { ComponentInstance } from "./Component";
import { System } from "./System";
import { Container } from "./Container";
import { trustedUndefined } from "./trustedUndefined";
import { descendants } from "./descendants";

export type EntityId = NominalString<"EntityId">;

export class Entity {
  id: EntityId = uuid();
  isActive: boolean = true;

  protected _parent?: Entity;
  private _system: System = trustedUndefined();
  private _childrenById = {} as Readonly<Record<EntityId, Entity>>;

  get parent() {
    return this._parent;
  }

  get system() {
    return this._system;
  }

  set system(value: System) {
    this._system = value;
    for (const entity of Array.from(descendants(this))) {
      entity.system = value;
    }
  }

  get childrenById() {
    return this._childrenById;
  }

  readonly children = new Container<Entity>();
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
    children?: Entity[],
    public name = ""
  ) {
    this.observations = [
      this.components.mount((component) => {
        component.configure({ entity: this });
        const unmountComponent = component.mount();
        return () => {
          if (unmountComponent) {
            unmountComponent();
          }
          component.configure({ entity: trustedUndefined() });
        };
      }),

      this.children.mount((child) => {
        child.setParent(this);
        return () => child.setParent(undefined);
      }),

      this.children.connect((added, removed) => {
        const updatedMap = { ...this.childrenById };
        for (const child of added) {
          updatedMap[child.id] = child;
        }
        for (const child of removed) {
          removeNominal(updatedMap, child.id);
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

  private setParent(newParent?: Entity) {
    if (this.parent) {
      this.parent.children.remove(this);
    }
    this._parent = newParent;
    this.system = newParent?.system ?? trustedUndefined();
  }
}
