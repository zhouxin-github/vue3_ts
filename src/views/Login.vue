<template>
  <div class="login_bj">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2 class="title">Vue3+TS电商后台系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, ref } from "vue";
import { LoginData } from "../type/Login";
import type { FormInstance } from 'element-plus';
import {login} from './../request/api';
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "账号不能为空",
          trigger: "blur",
        },
        { min: 3, max: 9, message: "账号的长度设置为3-9位", trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
        { min: 3, max: 9, message: "账号的长度设置为3-9位", trigger: "blur" },
      ],
    };
     // 登录
    const ruleFormRef = ref<FormInstance>() 
    const router = useRouter()
    // 类似于router => $router.push()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
          // 由于接口问题，可能呗别人修改了账号密码所以暂时通过异常去处理存token跳转至首页
          login(data.ruleForm).then((res)=>{
            // localStorage.setItem('token', res.data.token);
          }).catch((res)=>{
            localStorage.setItem('token', 'admin_token');
            router.push('/');
          })
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    // 重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return { ...toRefs(data), rules, ruleFormRef, resetForm, submitForm, router};
  },
});
</script>
<style lang="scss" scoped>
.login_bj {
  width: 100%;
  height: 100%;
  background: url(./../assets/login_bj.webp);
  overflow: hidden;
  .demo-ruleForm {
    width: 500px;
    margin: 280px auto;
    margin-right: 300px;
    background-color: #f0f8ff;
    padding: 20px;
    border-radius: 10px;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
    }
    .el-button {
      height: 100%;
      width: 48%;
    }
  }
}
</style>
