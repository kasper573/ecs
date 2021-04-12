import { RedefinableEntityConstructor } from "../RedefinableEntityConstructor";
import { EntityDefinitionId } from "../definition/EntityDefinition";

export type EntityConstructorMap = Map<EntityDefinitionId, EntityConstructor>;

export type EntityConstructor = RedefinableEntityConstructor;
