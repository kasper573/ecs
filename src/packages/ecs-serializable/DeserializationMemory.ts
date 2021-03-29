import { SystemModule } from "../ecs/SystemModule";
import { ComponentMap } from "./types/ComponentMap";
import { EntityConstructorMap } from "./types/EntityConstructorMap";
import { EntityInstanceMap } from "./types/EntityInstanceMap";

export class DeserializationMemory implements SystemModule {
  readonly componentConstructors: ComponentMap = new Map();
  readonly entityConstructors: EntityConstructorMap = new Map();
  readonly entityInstances: EntityInstanceMap = new Map();

  update() {}
}
