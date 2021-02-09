<template>
  <div class="login">
    <div class="login-mask"></div>
    <div class="login-form-wrap">
      <div class="login-form">
        <div class="login-form__content">
          <header>
            <img :src="logo" alt="" />
            <h1>{{ title }}</h1>
          </header>

          <el-form class="login-form__main" :model="formData" :rules="formRules" ref="formRef">
            <el-form-item name="account">
              <el-input size="large" v-model="formData.account" placeholder="username">
                <template #prefix>
                  <Iconify icon="ant-design:eye-invisible-outline" width="18" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item name="password">
              <el-input
                size="large"
                visibilityToggle
                v-model="formData.password"
                type="password"
                placeholder="password"
              >
                <template #prefix>
                  <Iconify icon="ant-design:eye-invisible-outline" width="18" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="w-full"
                type="primary"
                size="large"
                @click="login"
                :loading="formState.loading"
                round
              >
                Login in
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRaw } from 'vue';
  import { ElMessage } from 'element-plus';
  import logo from '/@/assets/images/logo.jpeg';
  import { useStore } from '/@/stores';

  export default defineComponent({
    setup() {
      const store = useStore();
      const formRef = ref<any>(null);
      const autoLoginRef = ref(false);

      const formData = reactive({
        account: 'admin',
        password: '123456',
      });

      const formState = reactive({
        loading: false,
      });

      const formRules = reactive({
        account: [{ required: true, message: '账号必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
      });

      async function handleLogin() {
        const form = unref(formRef);
        if (!form) return;
        formState.loading = true;
        try {
          const data = await form.validate();
          const userInfo = await store.dispatch(
            'userModule/login',
            toRaw({
              password: data.password,
              username: data.account,
            })
          );
          if (userInfo) {
            ElMessage.success({
              message: '',
              type: 'success',
              duration: '3',
            });
          }
        } catch (error) {
        } finally {
          formState.loading = false;
        }
      }
      return {
        formRef,
        formData,
        formState,
        formRules,
        title: 'E+ admin',
        login: handleLogin,
        autoLogin: autoLoginRef,
        logo,
      };
    },
  });
</script>

<style lang="scss">
  .login {
    @apply relative h-screen;
    background: url(../../assets/images/login/login-bg.png) no-repeat;
    background-size: 100% 100%;
    .login-mask {
      @apply md:block hidden h-full;
      background: url(../../assets/images/login/login-in.png) no-repeat 30% 30%;
      background-size: 80% 80%;
    }

    .login-form-wrap {
      @apply flex md:justify-end justify-center items-center absolute top-0 md:right-12 h-full w-full;
      .login-form {
        @apply p-12 w-max bg-blue-300 bg-opacity-60 rounded-3xl shadow-md;
        width: 360px;
        header {
          img {
            @apply m-auto rounded-full;
            width: 120px;
          }
          h1 {
            @apply text-center text-gray-50 mt-4 text-2xl;
          }
        }
      }
      .login-form__content {
        .login-form__main {
          @apply mt-4;
          .el-input__prefix {
            @apply flex justify-center items-center;
          }
        }
      }
    }
  }
</style>
