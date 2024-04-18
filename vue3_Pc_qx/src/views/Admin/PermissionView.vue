<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import url from '../../config/url'
// import axios from 'axios'
const {appContext} = getCurrentInstance()
const globalProperties = appContext.config.globalProperties

globalProperties.$http.get(url.AdminList).then((res)=>{
  console.log(res);
  
})


</script>

<style scoped>

</style>