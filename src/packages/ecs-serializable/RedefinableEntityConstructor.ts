import { EntityInitializerId } from "./types/EntityInitializer";
import { RedefinableEntity } from "./RedefinableEntity";

export type RedefinableEntityConstructor = new (
  id: EntityInitializerId
) => RedefinableEntity;
