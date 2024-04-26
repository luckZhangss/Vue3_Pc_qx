<template>
  <div>
    <!-- bodyCell 个性化单元格     column 列描述数据对象    text 内容   record 数据对象-->
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="add">Add</a-button>
    <a-table :columns="columns" :data-source="data.Members" bordered>
    <template #bodyCell="{ column, text, record }">
        
      <template v-if="['username','age','sex','phone'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record._id]"
            v-model:value="editableData[record._id][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record._id]">
            <a-typography-link @click="save(record._id)" >{{formStatus ? '修改':'保存'}}</a-typography-link>
            <a-typography-link @click="del(record._id)">删除</a-typography-link>
            <!-- <a-typography-link @click="add(record._id)">添加</a-typography-link> -->
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record._id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record._id)">编辑</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</div>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { getCurrentInstance, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import url from '../../config/url'

const formStatus = ref(true)
const { appContext } = getCurrentInstance();
const globalProperties = appContext.config.globalProperties;
console.log('00',globalProperties);


globalProperties.$http.get(url.Members).then((res)=>{
    console.log(res);
    data.Members = res.data.data
})

const data = reactive({
    Members:[]
})

const columns = [
  {
    title: "username",
    dataIndex: "username",
    width: "25%",
    align:'center',
    filters:[
        {
          text:'邹致远',
          value:'邹致远'
        }
    ],
    // 筛选
    onFilter: (value: string, record: TableDataType) => record.username.indexOf(value) === 0,
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    align:'center',
   
    // 从小到大排序
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "sex",
    dataIndex: "sex",
    width: "15%",
    align:'center'
   
  },
  {
    title: "phone",
    dataIndex: "phone",
    width: "25%",
    align:'center'
   
  },
  {
    title: "operation",
    dataIndex: "operation",
    align:'center'
  }
];
interface DataItem {
  _id: string;
  phone:number,
  username: string;
  age: number;
  sex: string;
}



const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// 添加
const add = (key: string)=>{
    // editableData[key] = []
    // console.log('添加了');
    // const newData = {
    //     username:'',
    //     age:'',
    //     phone:'',
    //     sex:''
    // }
    // data.Members.push(newData)
}

// 编辑
const edit = (key: string) => {
   
  editableData[key] = cloneDeep(data.Members.filter(item => key === item._id)[0]);
};

// 删除
const del = (key: string)=>{
    globalProperties.$http.delete(url.Members + '/' + editableData[key].phone).then((res)=>{
        // console.log(res);
        if(res.data.code === 0){
        globalProperties.$message.success({
            content:'删除成功',
            duration:2,
            onClose:()=>{
                window.location.reload()
            }
        })
     }   else{
        globalProperties.$message.error({
            content:res.data.msg,
            duration:2,
            onClose:()=>{
                
            }
        })
     }
        // console.log('删除了');
    })
   
    
}

// 修改
const save = (key: string) => {
//   Object.assign(data.Members.filter(item => key === item._id)[0], editableData[key]);
    if(formStatus){
        globalProperties.$http.put(url.Members,editableData[key]).then((res)=>{
    console.log('222',res);
     if(res.data.code === 0){
        globalProperties.$message.success({
            content:'修改成功',
            duration:2,
            onClose:()=>{
                window.location.reload()
            }
        })
     }   else{
        globalProperties.$message.error({
            content:res.data.msg,
            duration:2,
            onClose:()=>{
                
            }
        })
     }
})
    }else{
        // 添加
        globalProperties.$http.post(url.Members,editableData[key]).then((res)=>{
        console.log(res);
        
    })
    }


  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
