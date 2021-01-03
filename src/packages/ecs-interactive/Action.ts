import { Effect } from "./Effect";
import { World } from "../ecs/World";

export type Action = {
  name: string;
  perform: (world: World) => Effect | undefined;
};
