import { render } from "react-dom";
import { Component } from "../../ecs/Component";
import { TextSystem } from "./TextSystem";

export class TextAdventureRenderer extends Component {
  private targetElement?: Element;

  private stopRendering() {
    if (this.targetElement) {
      this.targetElement?.remove();
      this.targetElement = undefined;
    }
  }

  private renderAdventure() {
    const container = this.entity?.system?.getContext<Element>("renderTarget");
    if (!this.targetElement && container instanceof Element) {
      this.targetElement = document.createElement("div");
      container.appendChild(this.targetElement);
    }
    if (!this.targetElement) {
      return;
    }
    render(<TextSystem system={this.entity?.system!} />, this.targetElement);
  }

  constructor() {
    super({
      mount: () => () => this.stopRendering(),
      update: () => {
        if (!this.isActive) {
          this.stopRendering();
        } else {
          this.renderAdventure();
        }
      },
    });
  }
}
