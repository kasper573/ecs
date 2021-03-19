import { Component } from "../../ecs/Component";

export type NativeComponentName = string;

export type NativeComponents = Record<NativeComponentName, Component>;
