import { Container } from "../ecs/Container";
import { Entity } from "../ecs/Entity";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";

export class Inventory extends Container<Entity> implements SystemModule {
  system?: System;
}
