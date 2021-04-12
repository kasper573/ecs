import React, { PropsWithChildren, useReducer } from "react";
import { defaultState, introStateReducer } from "./functions/introStateReducer";
import { IntroContext } from "./IntroContext";

export const IntroProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(introStateReducer, defaultState);
  return (
    <IntroContext.Provider value={[state, dispatch]}>
      {children}
    </IntroContext.Provider>
  );
};
