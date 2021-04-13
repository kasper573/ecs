import { Store } from "redux";

export const reaction = <State, Selection>(
  store: Store<State>,
  select: (state: State) => Selection,
  react: (selection: Selection) => unknown,
  equalityFn: (a: Selection, b: Selection) => boolean = refEq
) => {
  let previous = select(store.getState());
  return store.subscribe(() => {
    const next = select(store.getState());
    if (!equalityFn(previous, next)) {
      previous = next;
      react(next);
    }
  });
};

export const refEq = <T>(a: T, b: T) => a === b;
