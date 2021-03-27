import { shallowEqual } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { current, isDraft } from "immer";

const shallowCreator = createSelectorCreator(defaultMemoize, shallowEqual);

const makeDraftSafe = (selector: Function) => (
  value: unknown,
  ...rest: unknown[]
) => selector(isDraft(value) ? current(value) : value, ...rest);

const draftSafeShallowCreator = (...args: any[]) =>
  makeDraftSafe((shallowCreator as any)(...args));

/**
 * Creates a draft safe selector with default memoization
 * but shallow equality check for parameters to memoize on.
 */
export const createShallowSelector: CreateShallowSelectorWithParams = draftSafeShallowCreator;

// createSelectorCreator has trouble inferring types properly,
// so we use this specific type definition that fits our use case.
type CreateShallowSelectorWithParams = <
  SelectParams extends (...args: any) => any,
  Select extends (params: ReturnType<SelectParams>) => any
>(
  selectParams: SelectParams,
  select: Select
) => (...args: Parameters<SelectParams>) => ReturnType<Select>;
