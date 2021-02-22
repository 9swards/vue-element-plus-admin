/*eslint no-unused-vars: "off"*/
/*eslint @typescript-eslint/no-unused-vars: "off"*/
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { AppStateTypes } from '../stores/interfaces';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<AppStateTypes>;
  }
}
