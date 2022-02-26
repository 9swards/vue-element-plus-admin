@@ -0,0 +1,51 @@
<template>
  <el-scrollbar>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="data.cachedViews">
          <component :is="Component" :key="key" class="page" />
        </keep-alive>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const route = useRoute()
    const store = useStore()

    const key = computed(() => route.path)

    let data = reactive({
      cachedViews: [...store.state.layout.tags.cachedViews],
    })
    watch(
      () => store.state.layout.tags.cachedViews.length,
      () => (data.cachedViews = [...store.state.layout.tags.cachedViews])
    )
    return {
      key,
      data,
    }
  },
})
</script>
