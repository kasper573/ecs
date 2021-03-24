export const filterUntilNoChange = <S>(
  filter: (state: S) => S,
  initialState: S
) => {
  let previousState = undefined;
  let state = initialState;
  while (state !== previousState) {
    previousState = state;
    state = filter(state);
  }
  return state;
};
