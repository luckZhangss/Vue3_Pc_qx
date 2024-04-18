<template>
  <div>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline" >
          <!-- 图表统计 -->
          <a-menu-item key="/admin/chart">
            <pie-chart-outlined />
            <span>图标统计</span>
            <router-link to="/admin/chart"></router-link>
          </a-menu-item>
          <!-- 会员管理 -->
          <a-menu-item key="/admin/members">
            <desktop-outlined />
            <router-link to="/admin/members"></router-link>
            <span>会员管理</span>
          </a-menu-item>
          <!-- ... -->
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>User</span>
              </span>
            </template>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-menu-item key="4">Bill</a-menu-item>
            <a-menu-item key="5">Alex</a-menu-item>
          </a-sub-menu>
          <!-- ... -->
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>Team</span>
              </span>
            </template>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="8">Team 2</a-menu-item>
          </a-sub-menu>
          <!-- 权限管理 -->
          <a-menu-item key="/admin/permission" v-if="user.data.username === 'vvv'">
            <file-outlined />
            <span>权限管理</span>
            <router-link to="/admin/permission"></router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 头 -->
        <a-layout-header style="background: #fff; padding: 0">
          <div
            style="
              display: flex;
              justify-content: end;
              margin-right: 60px;
              font-size: 30px;
            "
          >
            欢迎【
            <span style="color: red">{{ user.data.username }}</span> 】登录
            <div
              style="
                font-size: 14px;
                margin-left: 20px;
                cursor: pointer;
                color: blue;
              "
            >
              <a-popconfirm
                title="您确定要注销嘛?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirm"
                @cancel="cancel"
                style="cursor: pointer"
              >
                退出登录
              </a-popconfirm>
            </div>
          </div>
        </a-layout-header>
        <!-- 中间 -->
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '460px' }"
          >
            <router-view></router-view>
          </div>
        </a-layout-content>
        <!-- 尾部 -->
        <a-layout-footer style="text-align: center">
          zss2024.0418
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
// 获取实例
const {appContext} = getCurrentInstance()
console.log(appContext);
const globalProxy  = appContext.config.globalProperties
console.log(globalProxy);

import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import { message } from "ant-design-vue";
const collapsed = ref<boolean>(false);
  const router = useRouter();
const route = useRoute();
const state = reactive({
  selectedKeys:['/chart']
})
  



// 获取本地存储用户信息
let userInfo = localStorage.getItem("userInfo");
let user = JSON.parse(userInfo);
console.log(user);
// // 退出登录
const confirm = (e: MouseEvent) => {
  console.log(e);
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  router.push("/login");
  message.success("已注销");
};
//
const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error("已取消");
};
</script>

<style lang="scss" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
