import { Component } from "../../ecs/Component";
import { ComponentDefinitionId } from "./ComponentDefinition";

export type ComponentConstructorMap = Map<ComponentDefinitionId, Component>;
