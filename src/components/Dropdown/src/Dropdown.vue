<template>
  <el-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #dropdown>
      <el-dropdown-menu :selectedKeys="selectedKeys">
        <template v-for="item in getMenuList" :key="`${item.event}`">
          <el-dropdown-item @click="handleClickMenu(item)" :disabled="item.disabled">
            <Icon :icon="item.icon" v-if="item.icon" />
            <span class="ml-1">{{ item.text }}</span>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import type { DropMenu } from './types';

  import { defineComponent, computed, unref } from 'vue';
  import Icon from '/@/components/Icon/index';

  export default defineComponent({
    name: 'BasicDropdown',
    components: {
      Icon,
    },
    props: {
      /**
       * the trigger mode which executes the drop-down action
       * @default ['hover']
       * @type string[]
       */
      trigger: {
        type: [Array] as PropType<string[]>,
        default: () => {
          return ['contextmenu'];
        },
      },
      dropMenuList: {
        type: Array as PropType<DropMenu[]>,
        default: () => [],
      },
      selectedKeys: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    emits: ['menuEvent'],
    setup(props, { emit }) {
      const getMenuList = computed(() => props.dropMenuList);

      function handleClickMenu(item: DropMenu) {
        const { event } = item;
        const menu = unref(getMenuList).find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      }

      return { handleClickMenu, getMenuList };
    },
  });
</script>
