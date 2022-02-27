<template>
  <div class="layout-login" @keyup="enterSubmit">
    <el-form label-position="right" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"> 登录 </el-button>
        <el-button> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { store } from '@/stores'
import router from '@/routers'

const form = reactive({
  name: 'admin',
  pwd: 'admin',
})
const enterSubmit = (e: any) => {
  if (e.keyCode === 13) {
    onSubmit()
  }
}
const onSubmit = async () => {
  await store.dispatch('layout/login', { username: form.name, password: form.pwd })
  router.replace({ path: '/' })
  ElNotification({
    title: '欢迎',
    message: '欢迎回来',
    type: 'success',
  })
}
const rules = reactive({
  name: [
    {
      validator: (_rule: any, value: any, callback: (arg0: Error | undefined) => void) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
      },
      trigger: 'blur',
    },
  ],
  pwd: [
    {
      validator: (_rule: any, value: any, callback: (arg0: Error | undefined) => void) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
      },
      trigger: 'blur',
    },
  ],
})
</script>

<style lang="scss" scoped>
.layout-login {
  padding-top: 200px;
  width: 400px;
  margin: 0 auto;
}
</style>
