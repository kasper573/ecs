import { RedefinableEntity } from "../RedefinableEntity";
import { EntityDefinitionId } from "./EntityDefinition";

export type EntityConstructorMap = Map<EntityDefinitionId, EntityConstructor>;

export type EntityConstructor = typeof RedefinableEntity;
