import { IntroId, IntroMount, MountId } from "./IntroState";

type SetAction = { type: "SET"; mount: IntroMount };

type RemoveAction = { type: "REMOVE"; mountId: MountId };

type DismissAction = { type: "DISMISS"; introId: IntroId };

type RestoreAction = { type: "RESTORE"; introId: IntroId };

export type IntroAction =
  | SetAction
  | RemoveAction
  | DismissAction
  | RestoreAction;
