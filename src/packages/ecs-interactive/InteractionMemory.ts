import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { InteractionResult } from "./InteractionResult";

export class InteractionMemory
  extends Array<InteractionResult | undefined>
  implements SystemModule {
  system?: System;
}
