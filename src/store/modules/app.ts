import { VuexModule, getModule, Module } from 'vuex-module-decorators'
import store from '/@/store'

import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

const NAME = 'app'
hotModuleUnregisterModule(NAME)

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {}

export const appStore = getModule<App>(App)
