import { Component } from "../../../ecs/src/Component";
import { ComponentDefinitionId } from "../definition/ComponentDefinition";

export type ComponentConstructorMap = Map<ComponentDefinitionId, Component>;
