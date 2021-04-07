import { IntroState } from "../types/IntroState";

export function selectOpenMount({ mounted, resolved }: IntroState) {
  for (const mount of Object.values(mounted)) {
    if (mount.when && !resolved[mount.introId]) {
      return mount;
    }
  }
}
