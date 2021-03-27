import { Action, CaseReducer, createReducer, Reducer } from "@reduxjs/toolkit";

export const createSingleCaseReducer = <S, A extends Action>(
  initialState: S,
  reducer: (state: S, action: A) => S | void
): Reducer<S, A> =>
  createReducer<S>(initialState, (builder) =>
    builder.addDefaultCase((reducer as unknown) as CaseReducer<S>)
  );
