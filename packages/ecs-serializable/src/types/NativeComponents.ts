import { Component } from "../../../ecs/src/Component";

export type NativeComponentName = string;

export type NativeComponents = Record<NativeComponentName, Component>;
