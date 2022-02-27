<template>
  <div class="flex h-screen layout">
    <div
      class="fixed z-10 w-screen h-screen bg-gray-500 bg-opacity-25 layout-sidebar-mask"
      :class="{ hidden: menubar.status !== 2 }"
      @click="changeCollapsed"
    />
    <div
      class="z-20 flex flex-col h-screen duration-200 layout-sidebar bg-menubar transitiowidth"
      :class="{
        'w-64': menubar.status === 0 || menubar.status === 2,
        'w-0': menubar.status === 3,
        'w-16': menubar.status === 1,
        absolute: menubar.status === 2,
      }"
    >
      <div class="relative z-10 flex h-12 text-white layout-sidebar-logo bg-logo flex-center">
        {{ menubar.status === 0 || menubar.status === 2 ? 'nine' : menubar.status === 1 ? 'nine' : '' }}
      </div>
      <div class="flex flex-1 overflow-hidden layout-sidebar-menubar">
        <layout-menubar />
      </div>
    </div>
    <div class="flex flex-col flex-1 overflow-x-hidden overflow-y-auto layout-main">
      <div class="flex items-center justify-between h-12 border-b border-gray-100 shadow-sm layout-main-navbar">
        <layout-navbar />
      </div>
      <div class="z-10 h-10 px-3 overflow-hidden text-sm leading-10 text-gray-600 shadow layout-main-tags position">
        <layout-tags />
      </div>
      <div class="flex-1 overflow-hidden layout-main-content">
        <layout-content />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutContent from '@/layouts/default/components/PageContent.vue'
import LayoutMenubar from '@/layouts/default/components/MenuBar.vue'
import LayoutNavbar from '@/layouts/default/components/NavBar.vue'
import LayoutTags from '@/layouts/default/components/CacheTags.vue'
import { useStore } from '@/stores'
import throttle from '@/utils/throttle'

const store = useStore()
const changeDeviceWidth = () => store.commit('layout/changeDeviceWidth')
const changeCollapsed = () => store.commit('layout/changeCollapsed')
onMounted(() => {
  changeDeviceWidth()
  const throttleFn = throttle(300)
  let throttleF = async function () {
    await throttleFn()
    changeDeviceWidth()
  }
  window.addEventListener('resize', throttleF, true)
})
const { menubar } = store.state.layout
</script>

<style lang="scss">
.layout-sidebar-menubar {
  .el-menu {
    border-right: 0;
  }

  .el-scrollbar,
  .layout-main-content .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar .el-scrollbar__wrap,
  .layout-main-content .el-scrollbar .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
