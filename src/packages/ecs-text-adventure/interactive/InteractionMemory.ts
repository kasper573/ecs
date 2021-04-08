import { Component } from "../../ecs/Component";
import { InteractionResult } from "./InteractionResult";

export class InteractionMemory extends Component {
  private readonly items: Array<InteractionResult | undefined> = [];

  get peek() {
    return this.isActive ? this.items[this.items.length - 1] : undefined;
  }

  push(result: InteractionResult | undefined) {
    this.items.push(result);
  }
}
