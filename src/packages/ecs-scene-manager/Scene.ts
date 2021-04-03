import { Container } from "../ecs/Container";
import { Entity } from "../ecs/Entity";

export class Scene extends Container<Entity> {
  name: string = "";
}
