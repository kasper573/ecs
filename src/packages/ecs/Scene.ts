import { Container } from "./Container";
import { Entity } from "./Entity";

export class Scene<SystemState> extends Container<Entity<SystemState>> {}
