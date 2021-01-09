import { System } from "./System";
import { trustedUndefined } from "./util/trustedUndefined";

export abstract class SystemModule {
  public system: System<any> = trustedUndefined();
}
