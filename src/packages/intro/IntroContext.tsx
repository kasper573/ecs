import { createContext, Dispatch } from "react";
import { defaultState } from "./functions/introStateReducer";
import { IntroAction } from "./types/IntroAction";
import { IntroState } from "./types/IntroState";

export const IntroContext = createContext<[IntroState, Dispatch<IntroAction>]>([
  defaultState,
  () => {},
]);
