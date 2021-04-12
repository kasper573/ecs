import { uniq, groupBy } from "lodash";
import { ComponentInitializer } from "../../../ecs-serializable/src/definition/ComponentInitializer";

export const pairComponentInitializers = (
  baseItems: ComponentInitializer[],
  primaryItems: ComponentInitializer[]
): ComponentInitializerPair[] => {
  const baseItemsById = groupBy(baseItems, getId);
  const primaryItemsById = groupBy(primaryItems, getId);
  const ids = uniq([
    ...Object.keys(baseItemsById),
    ...Object.keys(primaryItemsById),
  ]);
  return ids.map((id) => ({
    base: first(baseItemsById[id]),
    primary: first(primaryItemsById[id]),
  }));
};

type ComponentInitializerPair = {
  base?: ComponentInitializer;
  primary?: ComponentInitializer;
};

const first = <T>(items?: T[]) => (items ? items[0] : undefined);
const getId = ({ id }: ComponentInitializer) => id;
