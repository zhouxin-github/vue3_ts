<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <el-container>
      <el-header height="80px">
        <el-row>
          <el-col :span="4"><img src="../assets/logo.png" class="logo" alt=""></el-col>
          <el-col :span="16"><h2>vue3+ts后台管理系统</h2></el-col>
          <el-col :span="4" class="quit-login">
            <el-button type="info" plain @click="signLogin()">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useRouter, useRoute} from 'vue-router';

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const list = router.getRoutes().filter((v)=>{
      return v.meta.isShow;
    });
    const signLogin = ()=> {
      localStorage.removeItem('token');
      router.push({
        path: 'login'
      })
    }
    return{list, active: route.path, signLogin}
  },
  components: {},
  
});
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #666;
  .logo{
  height: 80px;
} 
  h2,.quit-login {
    color: #fff;
    text-align: center;
    line-height: 80px;
    height: 80px;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
