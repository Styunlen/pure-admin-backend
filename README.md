<p align="center">
pure-admin官方后端重制版
<br />
采用nodejs编写
</p>

## 介绍

**中文** | [English](./README.EN.md)

官方版本只有mysql的后端，且没有使用orm框架，对数据操作的抽象程度有待完善，于是就出了这个重制版，算是对官方版本的贡献。


## 快速启动
### 设置后端使用的数据库

来到项目的 `env` 文件，设置一个环境变量`DATABASE_TYPE`

默认值是`sqlite`
```
DATABASE_TYPE='sqlite'
```
### 安装依赖

```
pnpm install
pnpm run typeorm migration:run -d .\src\config\database.ts
```

### 项目启动

采用 [nodemon](https://github.com/remy/nodemon) 运行项目，修改代码自动更新，无需重启

```
pnpm start
```

### `Swagger` 文档访问地址

http://localhost:3000

## 如何在 `Swagger` 中添加 `token` 验证

① 在注册接口注册个账号，然后去请求登录接口，请求成功之后看下面的返回值 `accessToken`，复制这个 `token`  
② 回到 `Swagger`，点击右上角的绿色边框 `Authorize`，您会看到一个 `Value` 的输入框，将复制的 `token` 前面加上 `Bearer ` 粘贴上去，点确定即可，注意需要在 `Bearer` 后面加个一个空格
