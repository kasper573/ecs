import { EntityInitializerId } from "./definition/EntityInitializer";
import { RedefinableEntity } from "./RedefinableEntity";

export type RedefinableEntityConstructor = new (
  id: EntityInitializerId
) => RedefinableEntity;
