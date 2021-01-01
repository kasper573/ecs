import { Entity } from "./Entity";
import { Effect } from "./Effect";
import { Context } from "./Context";

/**
 * Designed to be able to conveniently instantiate and extend Trait
 */
export class Trait {
  constructor(
    private _createActionName?: Trait["createActionName"],
    private _apply?: Trait["apply"]
  ) {}

  createActionName(entity: Entity): string | undefined {
    if (this._createActionName) {
      return this._createActionName(entity);
    }
  }

  apply(context: Context, entity: Entity): Effect | undefined {
    if (this._apply) {
      return this._apply(context, entity);
    }
  }
}
