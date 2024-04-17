/*

     * 统一封装请求的方法
 * 拦截器使用
 * 请求统一配置
 * 响应统一处理



*/ 
import axios from 'axios'

const http = axios.create({
    baseURL:'http://localhost:5000/api/v1',
    timeout:5000
})
http.interceptors.request.use((cfg)=>{
    return cfg
})
http.interceptors.response.use((res)=>{
    return res
})







export default http