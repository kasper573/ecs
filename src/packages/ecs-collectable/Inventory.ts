import { Container } from "../ecs/Container";
import { Entity } from "../ecs/Entity";

export class Inventory<SystemState> extends Container<Entity<SystemState>> {}
