export type IntroState = {
  resolved: Record<IntroId, boolean>;
  mounted: Record<MountId, IntroMount>;
};

export type IntroMount = {
  mountId: MountId;
  introId: IntroId;
  when: boolean;
};

export type IntroId = string;

export type MountId = string;
