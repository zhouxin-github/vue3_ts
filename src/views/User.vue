<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          v-model="selectData.nickName"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="selectData.role" placeholder="请选择角色">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="userName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-tag v-for="item in scope.row.role" :key="item.role">{{
            item.roleName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作" width="180">
        <template #default="scope">
          <el-button
            type="primary"
            plain
            size="small"
            @click="editUser(scope.row)"
            >{{ "编辑" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50PX">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50PX">
        <el-select multiple v-model="active.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updataUser">更改</el-button>
        <el-button type="primary" @click="isShow = false"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import { getUserList, getRoleList } from "./../request/api";
import { InitData, ListInt } from "./../type/user";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getUser();
      getRole();
    });
    const getUser = () => {
      getUserList().then((res) => {
        data.list = res.data;
      });
    };
    const getRole = () => {
      getRoleList().then((res) => {
        data.roleList = res.data;
      });
    };
    // 查詢
    const onSubmit = () => {
      let arr: ListInt[] = [];
      if (data.selectData.nickName || data.selectData.role) {
        // 只要其中有一个有数据就要查询
        if (data.selectData.nickName) {
          arr = data.list.filter((value) => {
            return value.nickName.indexOf(data.selectData.nickName) !== -1;
          });
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
            return value.role.find((item) => {
              return item.role == data.selectData.role;
            });
          });
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
    };
    // 监听属性
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if (data.selectData.nickName == "" || data.selectData.role == 0) {
        getUser();
      }
    });
    const editUser = (row: ListInt) => {
      data.isShow = true;
      data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((m) => m.role),
      };
    };
    const updataUser = () => {
      console.log("点击了更改！");
    };
    return { ...toRefs(data), onSubmit, editUser, updataUser };
  },
});
</script>

<style scoped></style>
