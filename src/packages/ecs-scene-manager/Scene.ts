import { Container } from "../ecs/Container";
import { Entity } from "../ecs/Entity";

export class Scene<SystemState> extends Container<Entity<SystemState>> {}
