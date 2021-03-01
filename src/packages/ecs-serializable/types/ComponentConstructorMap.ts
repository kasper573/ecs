import { Entity } from "../../ecs/Entity";
import { Component } from "../../ecs/Component";
import { ComponentDefinitionId } from "./ComponentDefinition";

export type ComponentConstructorMap = Map<
  ComponentDefinitionId,
  ComponentConstructor
>;

export type ComponentConstructor = new <T>(...args: T[]) => Component<Entity>;
