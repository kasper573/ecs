import { render, unmountComponentAtNode } from "react-dom";
import { Component } from "../../ecs/Component";
import { TextSystem } from "./TextSystem";

export class TextAdventureRenderer extends Component {
  get renderTarget() {
    return this.entity?.system?.getContext<Element>("renderTarget");
  }
  clearRenderTarget() {
    if (this.renderTarget) {
      unmountComponentAtNode(this.renderTarget);
    }
  }
  constructor() {
    super({
      mount: () => () => this.clearRenderTarget(),
      update: () => {
        const target = this.renderTarget;
        if (!this.isActive) {
          this.clearRenderTarget();
        } else if (target instanceof Element) {
          render(<TextSystem system={this.entity?.system!} />, target);
        }
      },
    });
  }
}
