import { shallowEqual } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";

/**
 * Creates a selector with shallow equality check for parameters to memoize on.
 */
export const createMemoizedSelector: CreateShallowSelectorWithParams = createSelectorCreator(
  defaultMemoize,
  shallowEqual
);

// createSelectorCreator has trouble inferring types properly,
// so we use this specific type definition that fits our use case.
type CreateShallowSelectorWithParams = <
  SelectParams extends (...args: any) => any,
  Select extends (params: ReturnType<SelectParams>) => any
>(
  selectParams: SelectParams,
  select: Select
) => (...args: Parameters<SelectParams>) => ReturnType<Select>;
