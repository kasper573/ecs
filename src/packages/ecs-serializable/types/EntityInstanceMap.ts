import { RedefinableEntity } from "../RedefinableEntity";
import { EntityInitializerId } from "../definition/EntityInitializer";

export type EntityInstanceMap = Map<EntityInitializerId, RedefinableEntity>;
