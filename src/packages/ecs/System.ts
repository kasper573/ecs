import { Entity } from "./Entity";
import { SceneId, SystemOptions } from "./SystemOptions";
import { Scene } from "./Scene";

export class System<SystemState> {
  public scenes: Record<SceneId, Scene<SystemState>>;
  public state: SystemState;

  private _sceneId: SceneId;
  public get sceneId() {
    return this._sceneId;
  }

  public set sceneId(value: SceneId) {
    if (value in this.scenes) {
      this._sceneId = value;
    } else {
      throw new Error(`Scene does not exist: ${value}`);
    }
  }

  private readonly getEntities = (system: System<SystemState>) =>
    system.scene ? Array.from(system.scene) : [];

  public get scene() {
    return this.scenes[this._sceneId];
  }
  public get entities() {
    const entities = this.getEntities(this);
    assignEntitiesToSystem(entities, this);
    return entities;
  }

  update() {
    for (const entity of this.entities) {
      for (const component of entity.components) {
        component.update();
      }
    }
  }

  constructor(
    optionsOrEntities: SystemOptions<SystemState> | Entity<SystemState>[] = []
  ) {
    const options = normalizeOptions(optionsOrEntities);
    this.state = options.state || ({} as SystemState);
    this.scenes = createScenes(options.scenes);
    this.sceneId = this._sceneId =
      options.sceneId ?? Object.keys(this.scenes)[0];
    this.getEntities = options.entities ?? this.getEntities;
    this.update();
  }
}

const assignEntitiesToSystem = <SystemState>(
  entities: Entity<SystemState>[],
  system: System<SystemState>
) => {
  for (const entity of entities) {
    entity.system = system;
  }
};

const createScenes = <SystemState>(
  sceneOptions: SystemOptions<SystemState>["scenes"] = {}
) =>
  Object.keys(sceneOptions).reduce(
    (scenes, sceneId) => ({
      ...scenes,
      [sceneId]: new Scene(...sceneOptions[sceneId]),
    }),
    {}
  );

const normalizeOptions = <SystemState>(
  optionsOrEntities: SystemOptions<SystemState> | Entity<SystemState>[] = []
) =>
  Array.isArray(optionsOrEntities)
    ? { scenes: { [defaultSceneId]: optionsOrEntities } }
    : {
        ...optionsOrEntities,
        scenes: optionsOrEntities.scenes ?? { [defaultSceneId]: [] },
      };

const defaultSceneId: SceneId = "default";
