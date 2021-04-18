import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { SerializedECSDefinition } from "../../../ecs-serializable/src/types/SerializedECSDefinition";
import { UserId } from "./User";

@Entity()
export class PublishedSystem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  systemId!: SystemDefinitionId;

  @Column()
  name!: string;

  @Column()
  ecs!: SerializedECSDefinition;

  @Column()
  userId!: UserId;
}
