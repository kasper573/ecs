import { SystemModule } from "../ecs/SystemModule";
import { ComponentConstructorMap } from "./types/ComponentConstructorMap";
import { EntityConstructorMap } from "./types/EntityConstructorMap";
import { EntityInstanceMap } from "./types/EntityInstanceMap";
import { ComponentInstancePropertyMap } from "./types/ComponentInstancePropertyMap";

export class DeserializationMemory implements SystemModule {
  readonly componentConstructors: ComponentConstructorMap = new Map();
  readonly entityConstructors: EntityConstructorMap = new Map();
  readonly entityInstances: EntityInstanceMap = new Map();
  readonly componentProperties: ComponentInstancePropertyMap = new Map();

  update() {}
}
