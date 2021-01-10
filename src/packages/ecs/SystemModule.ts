import { System } from "./System";
import { trustedUndefined } from "./trustedUndefined";

export class SystemModule {
  public system: System<any> = trustedUndefined();
}
