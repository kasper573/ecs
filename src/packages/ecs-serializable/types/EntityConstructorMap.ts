import { Entity } from "../../ecs/Entity";
import { EntityDefinitionId } from "./EntityDefinition";

export type EntityConstructorMap = Map<EntityDefinitionId, EntityConstructor>;

export type EntityConstructor = new <T>(...args: T[]) => Entity;
