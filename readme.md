# 后台逻辑
## 2018/8/9
### 创立项目结构
├─.gitignore
├─package.json
├─readme.md
├─express
|    ├─index.js
|    ├─static
|    ├─router
|    |   └login.js
|    ├─model
|    |   └connect _resume.js
|    ├─control
|    |    ├─getlogin.js
|    |    └postlogin.js
### 书写/login的get和post请求
+ 当request为get时,根据session中userinfo的值判断是否从数据库中调取数据返回给客户端
+ 当request为post时,获取req中的数据存储到数据库,并根据saveInfo决定是否往session中存储userInfo (难点)
### 解决跨域请求服务器配置问题
+ 
`const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))`
### 书写/register的post请求
+ 用formidable module来实现multipart/form-data的数据接收 (难点)
+ 数据库重名验证
+ 数据库写入