import { RedefinableEntity } from "../RedefinableEntity";
import { EntityInitializerId } from "./EntityInitializer";

export type EntityInstanceMap = Map<EntityInitializerId, RedefinableEntity>;
