import { Entity } from "./Entity";
import { Scene } from "./Scene";
import { SceneId, SystemOptions } from "./SystemOptions";

export class System<State = any> {
  public scenes: Record<SceneId, Scene>;
  public state: State;

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

  private readonly getEntities = (system: System<State>) =>
    system.scene ? Array.from(system.scene) : [];

  public get scene() {
    return this.scenes[this._sceneId];
  }
  public get entities() {
    return this.getEntities(this);
  }

  constructor(optionsOrEntities: SystemOptions<State> | Entity[] = []) {
    const options = normalizeOptions(optionsOrEntities);
    this.state = options.state || ({} as State);
    this.scenes = createScenes(options.scenes);
    this.sceneId = this._sceneId =
      options.sceneId ?? Object.keys(this.scenes)[0];
    this.getEntities = options.entities ?? this.getEntities;
  }
}

const createScenes = <State>(
  sceneOptions: SystemOptions<State>["scenes"] = {}
) =>
  Object.keys(sceneOptions).reduce(
    (scenes, sceneId) => ({
      ...scenes,
      [sceneId]: new Scene(...sceneOptions[sceneId]),
    }),
    {}
  );

const normalizeOptions = <State>(
  optionsOrEntities: SystemOptions<State> | Entity[] = []
) =>
  Array.isArray(optionsOrEntities)
    ? { scenes: { [defaultSceneId]: optionsOrEntities } }
    : {
        ...optionsOrEntities,
        scenes: optionsOrEntities.scenes ?? { [defaultSceneId]: [] },
      };

const defaultSceneId: SceneId = "default";
