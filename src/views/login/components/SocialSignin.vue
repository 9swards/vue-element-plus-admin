<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container">
        <Iconify icon="ant-design:wechat-outlined" style="font-size: 24px; color: white" />
      </span>
      WeChat
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container">
        <Iconify icon="ant-design:qq-outlined" style="font-size: 24px; color: white" />
      </span>
      QQ
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SocialSignin',
    methods: {
      wechatHandleClick(thirdPart: any) {
        alert(thirdPart);
      },
      tencentHandleClick(thirdPart: any) {
        alert(thirdPart);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .social-signup-container {
    display: flex;
    margin: 20px 0;
    .sign-btn {
      display: flex;
      cursor: pointer;
      align-items: center;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      margin-right: 10px;
    }
    .wx-svg-container {
      background-color: #24da70;
    }
    .qq-svg-container {
      background-color: #6ba2d6;
      margin-left: 50px;
    }
  }
</style>
