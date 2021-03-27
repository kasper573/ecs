import { ReactElement } from "react";
import { TypedUseSelectorHook } from "react-redux";

export const createSelectorComponent = <State>(
  useSelector: TypedUseSelectorHook<State>
) => <Selection>({
  use,
  children,
}: {
  use: (state: State) => Selection;
  children: (selection: Selection) => ReactElement | undefined;
}) => {
  const selection = useSelector(use);
  return children(selection) ?? null;
};
