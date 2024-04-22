<template>
  <div>
    <a-table :columns="columns" :data-source="data1.AdminList">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span>
          <smile-outlined />
          _id
        </span>
      </template>
      <template v-else-if="column.key === 'username'">
        <span>
          <smile-outlined />
          username
        </span>
      </template>
      <template v-else="column.key === 'edit'">
        <span>
          <smile-outlined />
              edit
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <a>
          {{ record._id }}
        </a>
      </template>
      <template v-else-if="column.key === 'username'">
        <a>
          {{ record.username }}
        </a>
      </template>
      
      <template v-else="column.key === 'edit'">
        <a>
         <button @click="showModal(record)">编辑</button>
        </a>
      </template>
    </template>
  </a-table>

    <!-- 点击打开弹出框 -->
    <a-modal v-model:open="open" :title="`设置【${currentUser.username}】`" @ok="handleOk">
      <a-transfer
        v-model:target-keys="targetKeys"
        v-model:selected-keys="selectedKeys"
        :data-source="data2"
        show-search
        :filter-option="filterOption"
        :render="item => item.title"
        :titles="['所有权限', '已有权限']"
        @change="handleChange"
        @search="handleSearch"
        @selectChange="handleSelectChange"
       
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { getCurrentInstance, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import url from "../../config/url";
// import axios from 'axios'
const { appContext } = getCurrentInstance();
const globalProperties = appContext.config.globalProperties;

const data1 = reactive({
  AdminList: [],
});
// 获取管理员权限列表
globalProperties.$http.get(url.AdminList).then((res) => {
  console.log(res);
  data1.AdminList = res.data.data;
});

let currentUser = reactive({
  username:''
})



let targetKeys = ref<string[]>([]);
const data2 = [
    {
      key: "chart",
      title: "图表管理",
    },
    {
      key: "members",
      title: "会员管理",
    },
    {
      key: "permission",
      title: "权限管理",
    }
  ];


  const selectedKeys = ref([]);

const open = ref<boolean>(false);
// 弹出框打开
const showModal = (record) => {
  open.value = true;
//  console.log('777',record);
//  console.log(record._id);
 currentUser = record
//  console.log('8',currentUser.acl);
 
 currentUser.username = record.username
 currentUser._id = record._id


// targetKeys.value = currentUser.acl
// console.log(targetKeys.value);



//  targetKeys.value = currentUser.acl.forEach((item)=>{
//     item.path.replace('/admin','')
//     console.log('000',targetKeys.value);
//  })

  // targetKeys.value = currentUser.acl
  // console.log('8',targetKeys.value);
  currentUser.acl.forEach(item=>{
    targetKeys.value.push(item.path.replace('/admin/',''))
    // console.log( item.path.replace('/admin/',''));
    console.log('100',targetKeys.value);
  })

};
const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  console.log('sourceSelectedKeys: ', sourceSelectedKeys);
  console.log('targetSelectedKeys: ', targetSelectedKeys);
};
// 弹出框关闭
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
  let permissionList = []
  targetKeys.value.forEach((item)=>{
      data2.forEach((item1)=>{
        if(item === item1.key){
            let obj = {}
            obj.name = item1.title,
            obj.path = '/admin/' +  item1.key
            permissionList.push(obj)
        }
      })
  })
  let data = {
    _id:currentUser._id,
    permissionList
  }
console.log('999',data);

  globalProperties.$http.put(url.setPermission,data).then((res)=>{
    console.log(res);
    if(res.data.code === 0){
      message.success({
          content: "权限保存成功",
          duration: 2,
          onClose: () => {
            window.location.reload()
          },
        });
    }else{
      message.error({
          content: res.data.msg,
          duration: 2,
          onClose: () => {
            
          },
        });
    }
  })
};
interface data {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

const filterOption = (inputValue: string, option: data) => {
  return option.description.indexOf(inputValue) > -1;
};
const handleChange = (
  keys: string[],
  direction: string,
  moveKeys: string[]
) => {
  console.log(keys, direction, moveKeys);
};

const handleSearch = (dir: string, value: string) => {
  console.log("search:", dir, value);
};



const columns = [
  {
    _id: 'id',
    name: 'id',
    key: 'id',
  },
  {
    _id: 'username',
    name: 'username',
    key: 'username',
  },
  {
    _id: 'edit',
    name: 'edit',
    key: 'edit',
  }
];


</script>

<style scoped></style>
