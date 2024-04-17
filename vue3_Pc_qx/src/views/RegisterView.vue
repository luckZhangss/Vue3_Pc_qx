<template>
  <div class="box">
    <a-card class="box-card">
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
      <a-form-item has-feedback label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="pass">
          <a-input
            v-model:value="formState.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input
            v-model:value="formState.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
     
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">注册</a-button>
          <a-button style="margin-left: 10px" @click="resetForm"
            >去登录</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import { message } from 'ant-design-vue';
import router from "@/router";
import axios from 'axios'




interface FormState {
  pass: string;
  checkPass: string;
  username: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    username: "",
     pass: "",
    checkPass: "",
  
});
const checkUsername: "" = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input the username");
  }
   else {
      return Promise.resolve();
    }
  }

const validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input the password");
  } else {
    if (formState.checkPass !== "") {
      formRef.value.validateFields("checkPass");
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input the password again");
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: "change" }],
  checkPass: [{ validator: validatePass2, trigger: "change" }],
  username: [{ validator: checkUsername, trigger: "change" }],
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    const {username,pass} = formState
    axios.post('http://localhost:5000/api/v1/register',{username:username,password:pass}).then((res)=>{
    console.log(res);
    if(res.data.code === 0){
         message.success({
            content:'注册成功',
            duration:2,
            onClose:()=>{
                router.push('/login')
            }
    })
    }else{
        message.error({
            content:res.data.msg,
            duration:3,
            onClose:()=>{
                formRef.value.resetFields();
            }
    })
    }
   
})

//   console.log(values, formState);
};
const handleFinishFailed = (errors) => {
  console.log(errors);
};
const resetForm = () => {
//   formRef.value.resetFields();
        router.push('/login')
};
const handleValidate = (...args) => {
  console.log(args);
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
    // margin-top: 240px;
background-image: url('https://img-baofun.zhhainiao.com/fs/2c66fb3aabcec30a88ea7696b25c5ba7.jpg');
background-size: cover;
background-repeat: no-repeat;
}
.box-card {
  width: 400px;
  opacity: 0.7;
}
</style>
