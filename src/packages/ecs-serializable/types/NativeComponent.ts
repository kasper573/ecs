import { ComponentConstructor } from "./ComponentConstructorMap";
import { NativeComponentOptions } from "./NativeComponentOptions";

export type NativeComponent = ComponentConstructor & {
  options: NativeComponentOptions;
};
