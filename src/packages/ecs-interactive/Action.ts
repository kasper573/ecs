import { World } from "../ecs/World";
import { Effect } from "./Effect";

export type Action = {
  name: string;
  perform: (world: World) => Effect | undefined;
};
