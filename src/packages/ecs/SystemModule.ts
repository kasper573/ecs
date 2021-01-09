import { System } from "./System";

export abstract class SystemModule {
  protected system?: System<any>;
  plugin(system: System<any>) {
    this.system = system;
  }
  detach() {
    this.system = undefined;
  }
}
