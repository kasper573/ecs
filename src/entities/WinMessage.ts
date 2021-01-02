import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";

export class WinMessage extends Entity {
  constructor() {
    super("win-message", undefined, () => [
      new Observable({ observe: () => "You win!" }),
    ]);
  }
}
