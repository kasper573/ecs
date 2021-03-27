import { Action, Reducer } from "@reduxjs/toolkit";

export const createFilteredReducer = <S, A extends Action>(
  reducer: Reducer<S, A>,
  filters: Array<Reducer<S, A> | ((state: S) => S)>
): Reducer<S, A> => (state, action) =>
  filters.reduce(
    (state, filter) => filter(state, action),
    reducer(state, action)
  );
