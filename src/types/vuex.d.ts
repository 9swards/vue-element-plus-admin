import { Store } from 'vuex';
import { AllStateTypes } from '/@/store/interface';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<AllStateTypes>;
  }
}
