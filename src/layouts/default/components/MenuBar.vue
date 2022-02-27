<template>
  <div></div>
</template>

<script lang="ts" setup></script>

<style>
.el-menu {
  background-color: #001529;
}

.el-menu .el-menu {
  background-color: #000c17;
}

.el-menu-item:focus,
.el-menu-item:hover,
.el-sub-menu__title:hover {
  background-color: transparent;
}

.el-menu-item.is-active {
  background-color: #1890ff;
  color: #fff;
}
</style>
