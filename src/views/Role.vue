<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole()">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="editRole(scope.row)"
            >{{ "修改权限" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from "vue";
import { getRoleList } from "../request/api";
import { InitData, ListInt } from "../type/role";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    onMounted(() => {
      getRoleList().then((res) => {
        data.list = res.data;
      });
    });
    const addRole = () => {
      console.log("dddd");
      ElMessageBox.prompt("", "请添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
            if(value) {
                data.list.push({
                    roleId: data.list.length + 1,
                    roleName: value,
                    authority: []
                })            }
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "角色添加失败",
          });
        });
    };
    const editRole = (row:ListInt) => {
        router.push({
            name: 'authority',
            params: {
                id: row.roleId,
                authority: row.authority
            }
        })
    }
    return { ...toRefs(data), addRole, editRole};
  },
});
</script>

<style scoped></style>
