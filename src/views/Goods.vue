<template>
  <div class="select_box">
    <el-form :inline="true" :model="selectDataInt" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectDataInt.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input
          v-model="selectDataInt.introduce"
          placeholder="请输入关键字"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination layout="prev, pager, next" @size-change="sizeChange" @current-change="currentchange" :total="selectDataInt.count" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { InitData, ListInt } from "./../type/goods";
import { getGoodsList } from "./../request/api";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    getGoodsList().then((res) => {
      data.list = res.data;
      data.selectDataInt.count = res.data.length;
      console.log(res.data);
    });
    const dataList = reactive({
        comList: computed(()=>{
            return data.list.slice((data.selectDataInt.page -1) * data.selectDataInt.pagesize, data.selectDataInt.page * data.selectDataInt.pagesize);
        })
    })
    const sizeChange = (pagesize:number) => {
        data.selectDataInt.pagesize = pagesize;
    }
    const currentchange = (page:number) => {
        data.selectDataInt.page = page;
    }
    const onSubmit = () => {
        let arr:ListInt[] = [];
        if(data.selectDataInt.title || data.selectDataInt.introduce) {
            // 只要其中有一个有数据就要查询
            if(data.selectDataInt.title) {
                arr = data.list.filter((value)=>{
                    return value.title.indexOf(data.selectDataInt.title) !== -1;
                })
            }
            if(data.selectDataInt.introduce) {
                arr = data.list.filter((value)=>{
                    return value.introduce.indexOf(data.selectDataInt.introduce) !== -1;
                })
            }
        } else {
            arr = data.list;
        }
        data.selectDataInt.count = arr.length;
        data.list = arr;
    }
    // 监听属性
    watch([()=> data.selectDataInt.title, ()=> data.selectDataInt.introduce],()=>{
        if(data.selectDataInt.title == "" && data.selectDataInt.introduce == "") {
            getGoodsList().then((res) => {
                data.list = res.data;
                data.selectDataInt.count = res.data.length;
            });
                }
    });
    return { ...toRefs(data), sizeChange ,currentchange, dataList, onSubmit};
  },
});
</script>

<style scoped></style>
