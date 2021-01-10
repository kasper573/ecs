import { System } from "./System";
import { trustedUndefined } from "./util/trustedUndefined";

export class SystemModule {
  public system: System<any> = trustedUndefined();
}
