import { ComponentConstructorMap } from "./types/ComponentConstructorMap";
import { EntityConstructorMap } from "./types/EntityConstructorMap";
import { EntityInstanceMap } from "./types/EntityInstanceMap";
import { ComponentInstancePropertyMap } from "./types/ComponentInstancePropertyMap";

export class DeserializationMemory {
  readonly componentConstructors: ComponentConstructorMap = new Map();
  readonly entityConstructors: EntityConstructorMap = new Map();
  readonly entityInstances: EntityInstanceMap = new Map();
  readonly componentProperties: ComponentInstancePropertyMap = new Map();

  clear() {
    this.componentConstructors.clear();
    this.entityConstructors.clear();
    this.entityInstances.clear();
    this.componentProperties.clear();
  }
}
