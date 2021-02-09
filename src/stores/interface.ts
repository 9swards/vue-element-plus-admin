import { UserStateTypes } from '/@/stores/modules/interface';

export interface RootStateTypes {
  app: string;
}

export interface AllStateTypes extends RootStateTypes {
  userModule: UserStateTypes;
}
