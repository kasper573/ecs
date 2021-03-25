import { Action, createReducer, Reducer } from "@reduxjs/toolkit";

export const createSingleCaseReducer = <S, A extends Action>(
  initialState: S,
  reducer: (state: S, action: A) => S | void
): Reducer<S, A> =>
  createReducer<S>(initialState, (builder) =>
    builder.addDefaultCase((state, action) => reducer(state as S, action as A))
  );
