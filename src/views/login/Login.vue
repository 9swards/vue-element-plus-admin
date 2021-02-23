<template>
  <div>
    <el-form ref="formRef">
      <el-form-item>
        <el-input v-model="formData.account" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button @click="login" :loading="formState.loading">{{
          t('routes.login.btn')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { ElMessage } from 'element-plus';
  import { defineComponent, reactive, unref, ref, toRaw } from 'vue';

  import { useI18n } from '/@/hooks/useI18n';
  import { useStore } from '/@/stores';
  import { useStoreFn } from '/@/stores/getModuleFnKey';
  import { MODULES } from '/@/stores/interfaces';
  import { ActionTypes } from '/@/stores/modules/user/types';

  export default defineComponent({
    name: 'Login',
    setup() {
      const { dispatch } = useStore();
      const { actionKey } = useStoreFn();
      const { t } = useI18n();
      const formRef = ref<any>(null);
      const autoLoginRef = ref(false);
      const formData = reactive({
        account: 'admin',
        password: 'admin',
      });
      const formState = reactive({
        loading: false,
      });
      const formRules = reactive({
        account: [{ required: true, message: t('sys.login.accountPlaceholder'), trigger: 'blur' }],
        password: [
          { required: true, message: t('sys.login.passwordPlaceholder'), trigger: 'blur' },
        ],
      });
      async function handleLogin() {
        const form = unref(formRef);
        if (!form) return;
        formState.loading = true;
        try {
          const userInfo = await dispatch(
            actionKey(MODULES.USER_MODULE_NAME, ActionTypes.ACT_LOGIN),
            toRaw({
              password: formData.password,
              username: formData.account,
            })
          );
          if (userInfo) {
            ElMessage.success(t('sys.login.loginSuccessTitle'));
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
        login: handleLogin,
        autoLogin: autoLoginRef,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
