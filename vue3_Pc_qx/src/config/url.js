/*

统一管理接口地址


*/
const prefix1 = "http://localhost:5000/api/v1";
const prefix2 = "http://localhost:3000";
const url = {
  //管理员注册
  Register: prefix1 + "/register",
  //管理员登录
  Login: prefix1 + "/login",
  // 管理员权限
  setPermission: prefix1 + "/users/setPermission",
  // 获取管理员
  AdminList: prefix1 + "/users/list",
};

export default url;
