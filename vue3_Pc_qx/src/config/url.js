/*

统一管理接口地址


*/
const prefix1 = "http://localhost:5000/api/v1";
// const prefix2 = "http://localhost:3000";
const url = {
  //管理员注册
  Register: prefix1 + "/register",
  //管理员登录
  Login: prefix1 + "/login",
  // 设置管理员权限
  setPermission: prefix1 + "/users/setPermission",
  // 获取管理员列表
  AdminList: prefix1 + "/users/list",
   //管理员信息
   Profile: prefix1 +'/profile',
};

export default url;
