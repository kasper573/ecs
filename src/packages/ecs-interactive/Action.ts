import { System } from "../ecs/System";
import { Effect } from "./Effect";

export type Action = {
  name: string;
  perform: (system: System) => Effect | undefined;
};
