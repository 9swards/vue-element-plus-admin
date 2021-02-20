import { InjectionKey } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';

import { formatToDateTime } from '/@/utils/dateUtil';
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { useProjectSetting } from '/@/hooks/setting';
import { RootStateTypes, ErrorInfo, ErrorStateTypes } from '/@/store/interface';

const errorModule: Module<ErrorStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    // error log list
    errorInfoState: [] as ErrorInfo[],
    // error log count
    errorListCountState: 0,
  },
  getters: {
    getErrorInfoState() {
      return this.errorInfoState;
    },

    getErrorListCountState() {
      return this.errorListCountState;
    },
  },
  mutations: {
    commitErrorInfoState(state, info: ErrorInfo): void {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      };
      state.errorInfoState = [item, ...state.errorInfoState!];
      state.errorListCountState += 1;
    },

    commitErrorListCountState(state, count: number): void {
      state.errorListCountState = count;
    },
  },
  actions: {
    setupErrorHandle({ commit }, error: any) {
      const { useErrorHandle } = useProjectSetting();
      if (!useErrorHandle) return;

      const errInfo: Partial<ErrorInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      };
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response;
        errInfo.url = url;
        errInfo.name = 'Ajax Error!';
        errInfo.file = '-';
        errInfo.stack = JSON.stringify(data);
        errInfo.detail = JSON.stringify({ params, method, headers });
      }
      commit('commitErrorInfoState', errInfo as ErrorInfo);
    },
  },
};

export default errorModule;
export const key: InjectionKey<Store<ErrorStateTypes>> = Symbol('errorModule');

export function useErrorStore<T = ErrorStateTypes>() {
  return baseUseStore<T>(key);
}
