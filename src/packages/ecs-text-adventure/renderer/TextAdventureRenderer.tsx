import { render } from "react-dom";
import { Component } from "../../ecs/Component";
import { TextSystem } from "./TextSystem";

export class TextAdventureRenderer extends Component {
  get renderTarget() {
    return this.entity?.system?.getContext<Element>("renderTarget");
  }
  constructor() {
    super({
      update: () => {
        const target = this.renderTarget;
        if (target instanceof Element) {
          render(<TextSystem system={this.entity?.system!} />, target);
        }
      },
    });
  }
}
