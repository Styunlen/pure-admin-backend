const errMsg = {
  notRegister: "账号尚未被注册",
  wrongVerification: "请输入正确的验证码",
  emptyPwd: "密码不得为空",
  wrongPwd: "密码错误",
  weakPwd: "密码长度不能小于6位",
  alreadyRegistered: "账号已被注册",
  emptyQuery: "搜索信息不能为空",
  queryInvalid: "请求参数错误",
  operationInvalid: "API操作错误",
  uploadFailed: "文件上传失败",
  databaseError: "数据库异常"
};

const successMsg = {
  logged: "登录成功",
  registered: "账号注册成功",
  edited: "修改成功",
  deleted: "删除成功",
  uploaded: "文件上传成功"
};

export const messages = {
  successMsg,
  errMsg
};
