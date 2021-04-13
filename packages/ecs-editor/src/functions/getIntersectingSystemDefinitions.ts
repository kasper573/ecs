import { uniq } from "lodash";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../../ecs-serializable/src/definition/SystemDefinition";
import { typedKeys } from "../../../ecs-common/src/typedKeys";

/**
 * Returns the systems from base that exist in both base and compare.
 */
export function getIntersectingSystemDefinitions(
  base: ECSDefinition,
  compare: ECSDefinition[]
): SystemDefinition[] {
  const existingSystemIds = typedKeys(base.systems);
  const compareSystemIds = uniq(
    compare.reduce(
      (ids: SystemDefinitionId[], ecs) => [...ids, ...typedKeys(ecs.systems)],
      []
    )
  );
  const intersectingSystemIds = compareSystemIds.filter((id) =>
    existingSystemIds.includes(id)
  );
  return intersectingSystemIds.map((id) => base.systems[id]);
}
