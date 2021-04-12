import { System } from "../../ecs/System";
import { EntityInitializerId } from "../definition/EntityInitializer";

export class DeserializedSystem extends System<EntityInitializerId> {}
