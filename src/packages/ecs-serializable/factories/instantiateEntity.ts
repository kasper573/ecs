import { EntityInitializer } from "../types/EntityInitializer";
import { EntityConstructorMap } from "../types/EntityConstructorMap";

/**
 * Creates an Entity instance for the specified EntityInitializer
 */
export const instantiateEntity = (
  { definitionId }: EntityInitializer,
  constructors: EntityConstructorMap
) => {
  const DefinedEntity = constructors.get(definitionId);
  if (!DefinedEntity) {
    throw new Error(`Could not find entity definition by id: ${definitionId}`);
  }
  return new DefinedEntity();
};
