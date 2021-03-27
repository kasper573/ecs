/**
 * Placeholder function for future implementation of selector memoization.
 * Does not actually memoize right now (we can't, since we use selectors in reducers that use immer drafts).
 */
export const createMemoizedSelector: CreateMemoizedSelector = (
  selectParams,
  select
) => (...args) => select(selectParams(...args));

type CreateMemoizedSelector = <
  SelectParams extends (...args: any) => any,
  Select extends (params: ReturnType<SelectParams>) => any
>(
  selectParams: SelectParams,
  select: Select
) => (...args: Parameters<SelectParams>) => ReturnType<Select>;
