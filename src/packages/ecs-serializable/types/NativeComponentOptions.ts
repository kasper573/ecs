import { ComponentOptions } from "../../ecs/Component";
import { PrimitiveName } from "./PrimitiveTypes";

export type NativeComponentOptions = Partial<
  Record<keyof ComponentOptions, PrimitiveName>
>;
