<template>
  <div>
    <el-config-provider
      :locale="globalConfig.locale"
      :message="globalConfig.message"
      :button="globalConfig.button"
      :size="globalConfig.size"
      :z-index="globalConfig.zIndex"
    >
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import ja from 'element-plus/lib/locale/lang/ja'

const globalConfig = ref({
  locale: ja,
  size: 'large',
  zIndex: 100,
  button: {
    autoInsertSpace: true,
  },
  message: {
    max: 10,
  },
})
</script>
