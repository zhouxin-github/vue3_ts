<template>
  <div>
    <el-tree
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 17, 18]"
      :default-expanded-keys = "[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 17, 18]"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <!-- 数据接收不到暂时看效果先写死了
    :default-checked-keys="authority" -->
    <!-- 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    :check-strictly="true" -->
    <el-button type="primary" @click="editAuthority()">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { InitData } from "./../type/authority";
import { getAuthorityList } from "../request/api";
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';

export default defineComponent({
  setup() {
    // 页面跳转携带参数，通过params传参 使用route接收 route.params。value中没有接收到值
    const route = useRoute();
    const params: any = route.params;
    const data = reactive(new InitData(params.id, params.authority));
    onMounted(() => {
      getAuthorityList().then((res) => {
        data.list = res.data;
      });
    });
    const editAuthority = () => {
      ElMessageBox.alert("点击修改权限按钮去修改相关操作并保存刷新页面", "提示", {
        confirmButtonText: "确定",
        callback: (action: Action) => {
          ElMessage({
            type: "success",
            message: `权限修改成功！`,
          });
        },
      });
    };
    return { ...toRefs(data), editAuthority };
  },
});
</script>

<style scoped></style>
