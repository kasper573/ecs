import { Component } from "../../ecs/Component";
import { Entity } from "../../ecs/Entity";

export type NativeComponents = Record<
  string,
  new (...args: any[]) => Component<Entity>
>;
