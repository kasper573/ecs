import { Component } from "../ecs/Component";
import { InteractionResult } from "./InteractionResult";

export class InteractionMemory extends Component {
  readonly items: Array<InteractionResult | undefined> = [];
}
