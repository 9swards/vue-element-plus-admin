<template>
  <div>
    login {{ app }}
    <el-button>{{ t('routes.login.btn') }}</el-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { useI18n } from '/@/plugins/useI18n';
  import { useStore } from '/@/stores';
  import { MODULES } from '/@/stores/interfaces';
  export default defineComponent({
    name: 'Login',
    setup() {
      const { t } = useI18n();
      const store = useStore();
      const app = computed(() => store.getters[`${MODULES.APP_MODULE_NAME}/getTitle`]);
      return { t, app };
    },
  });
</script>

<style lang="scss" scoped></style>
