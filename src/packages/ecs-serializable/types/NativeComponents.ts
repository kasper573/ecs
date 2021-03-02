import { ComponentConstructor } from "./ComponentConstructorMap";

export type NativeComponentName = string;

export type NativeComponents = Record<
  NativeComponentName,
  ComponentConstructor
>;
