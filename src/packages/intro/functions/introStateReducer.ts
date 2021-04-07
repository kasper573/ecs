import { IntroState } from "../types/IntroState";
import { IntroAction } from "../types/IntroAction";
import { loadResolved, saveResolved } from "./introStateStorage";

export const defaultState: IntroState = {
  resolved: loadResolved(),
  mounted: {} as IntroState["mounted"],
};

export function introStateReducer(
  state: IntroState | undefined = defaultState,
  action: IntroAction
): IntroState {
  switch (action.type) {
    case "SET": {
      const mounted = {
        ...state.mounted,
        [action.mount.mountId]: action.mount,
      };
      return { ...state, mounted };
    }
    case "REMOVE": {
      const mounted = { ...state.mounted };
      delete mounted[action.mountId];
      return { ...state, mounted };
    }
    case "DISMISS":
      const resolved = { ...state.resolved, [action.introId]: true };
      saveResolved(resolved);
      return { ...state, resolved };
  }
}
