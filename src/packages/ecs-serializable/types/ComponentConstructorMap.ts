import { Component } from "../../ecs/Component";
import { ComponentDefinitionId } from "../definition/ComponentDefinition";

export type ComponentConstructorMap = Map<ComponentDefinitionId, Component>;
