import type { MODULES } from './interfaces';
import type {
  GetterTypes as ag,
  ActionTypes as aa,
  MutationTypes as am,
} from './modules/app/types';
import type {
  GetterTypes as ug,
  ActionTypes as ua,
  MutationTypes as um,
} from './modules/user/types';

const getterKey = (m: MODULES, f: ag | ug): string => {
  return `${m}/${f}`;
};

const mutationKey = (m: MODULES, f: am | um): string => {
  return `${m}/${f}`;
};

const actionKey = (m: MODULES, f: aa | ua): string => {
  return `${m}/${f}`;
};

export const useStoreFn = () => {
  return {
    getterKey,
    mutationKey,
    actionKey,
  };
};
