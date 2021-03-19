import { Reducer } from "react";

export const combineReducers = <State, Action>(
  ...reducers: Reducer<State, Action>[]
): Reducer<State, Action> => (state, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state);
