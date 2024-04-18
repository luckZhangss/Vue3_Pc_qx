<template>
  <div class="box">
    <a-card class="box-card">
      <a-form
        :model="formState"
        ref="formRef"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <a href="/">register now!</a>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import router from "@/router";
import type { FormInstance } from "ant-design-vue";
import axios from "axios";
const formRef = ref<FormInstance>();
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  //   console.log("Success:", values);
  const { username, password } = formState;
  axios
    .post("http://localhost:5000/api/v1/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res);
      if (res.data.code === 0) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        message.success({
          content: "登录成功",
          duration: 2,
          onClose: () => {
            router.push("/");
          },
        });
      } else {
        message.error({
          content: res.data.msg,
          duration: 3,
          onClose: () => {
            formRef.value.resetFields();
          },
        });
      }
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>

<style lang="scss" scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // margin-top: 240px;
  background-image: url("https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/c67054e93674afd47db04f2a1c89657a.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_1920%2ch_1080");
}
.box-card {
  width: 340px;
  opacity: 0.7;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn {
  width: 100%;
}
</style>
