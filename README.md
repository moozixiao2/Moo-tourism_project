# tourism_project

### 头部 + 底部准备

>由于页面中的头部及底部都是一致的，所以可以在 `components` 文件夹中创建 `header.vue` `footer.vue` ，嵌套在 `layouts` 文件夹下的 `default.vue` 中

#### 头部的制作 底部的制作

> 头部制作如下，底部制作略

```vue
<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 导航 -->
      <el-row type="flex" class='navs'>
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录显示相关 -->
        <el-row type="flex">
            <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </el-row>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header{
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    box-shadow: 0 0 3px #ddd;
    border-bottom: solid 1px #ddd;
    
    .main{
        width: 1000px;
        margin: 0 auto;

        .logo{
            width: 156px;
            padding-top: 9px;
            img{
                display: block;
                width: 100%;
            }
        }

        .navs{
            flex: 1;
            margin: 0 20px;
            a{
                display: block;
                padding: 0 20px;
                height: 60px;
                box-sizing: border-box;
                &:hover{
                    color: #409eff;
                    border-bottom: solid 5px #409eff;
                }
            }
            .nuxt-link-exact-active{
                background: #409eff;
                color: #fff;
                &:hover{
                    color: #fff;
                }
            }
        }
    }
}
</style>
```

#### 引入 - 注册 - 使用 ####

> default.vue

```vue
<template>
  <div>
    <!-- 头部 -->
    <Header />
    <nuxt />
    <!-- 底部 -->
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components: {
    Header, Footer
  }
}
</script>
```

### 1. 首页 ###

####1.1 轮播图制作

> 轮播图制作 - element-ui 走马灯

> 由于在 `div` 中设置背景图片显示，`div` 本身没有高度，所以需设置高度，以及父容器样式

```vue
<div class="banners">
    <el-carousel indicator-position="none" arrow="always">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
            <div class="banners-image" :style="`height:700px;background: url(${$axios.defaults.baseURL + item.url}) center center no-repeat;background-size:contain contain`"></div>
        </el-carousel-item>
    </el-carousel>
</div>
```

> 创建获得轮播图接口

```js
data() {
    return {
      //轮播图图片数据
      banners: []
    }
},
mounted () {
    this.$axios({
      url: '/scenics/banners'
    })
    .then(res => {
      const { data } = res.data
      this.banners = data
    })
}
```

#### 1.2 tab切换

>通过设置 tab 切换的数据数组，在 `span` 标签中遍历，设置显示的 `span` 切换

> 在 `input` 中动态判定 tab当前数据索引中的 `placeholder`，实现切换

> 设置 `span` 的点击事件，将对应的索引赋给 `current`，并判断 `index`等于 **2** （机票）时，跳转至机票的页面

>通过动态绑定 `span` 的 class 来设置当前点击的 tab 高亮显示

##### **1.2.1 布局设置** #####

```html
<div class="tab-wrap">
    <el-row type="flex" class="tab-navs">
        <span v-for="(item, index) in tabOptions" :key='index' @click='handleClick(index)' :class="{active: current === index}"><i>{{ item.title }}</i></span>
    </el-row>
    <el-row type="flex" class="tab-input">
        <el-input :placeholder="tabOptions[current].placeholder">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
    </el-row>
</div>
```

##### **1.2.2 data设置** #####

```js
//当前tab
current: 0,
//tab数据设置
tabOptions:[
    {
        title: '攻略',
        placeholder: '请输入城市'
    },
    {
        title: '酒店',
        placeholder: '请输入城市 - 搜索城市'
    },
    {
        title: '机票',
        placeholder: ''
    }
]
```

### 2. 登录 - 注册

#### 2.1 登录组件 ####

> 登录页面是由标签页组成的 **登录 - 注册** 切换，通过点击标签显示对应的表单

>因此可以在登录组件页面设置标签页标签的切换功能

> 而登录及注册的表单则可以分离出两个组件，登录组件则引入 - 注册 - 使用并判断即可

##### **2.1.1 登录组件设置** #####

```html
<div class="login-wrap">
    <el-row type='flex' justify='center' align='middle' class="login-form">
      <div class="login-tab-wrap">
        <el-row type="flex" justify="center" class="login-tabs">
          <span v-for="(item, index) in ['登录', '注册']" :key='index' @click="current = index" :class='{active: current === index}'>{{item}}</span>
        </el-row>

        <!-- loginForm组件 -->
        <LoginForm v-if="current === 0" />

        <!-- register组件 -->
        <RegisterForm v-else />
      </div>
    </el-row>
</div>
```

##### **2.1.2 script设置** #####

```js
// 引入
import LoginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/registerForm'
export default {
  components: {
    LoginForm, RegisterForm
  },
  data() {
    return {
      // 当前tab
      current: 1
    }
  }
}
```

#### 2.2. 登录表单 components/loginForm.vue ####

> 创建登录表单组件、给表单绑定 `form` 对象，对应文本框双向绑定 `form` 对象中的属性，设置表单验证规则 `rules` 

> 点击登录按钮，需对表单二次验证，验证符合，则调用登录接口，传入对应参数 `this.form`，登录成功给出提示，需把用户登录数据存储到 `store` 中

> 在 **store 文件夹中创建 user.js** 设置 `store`

##### **2.2.1 登录表单变量及方法设置** #####

```js
export default {
    data() {
        return {
            // 登录参数
            form: {
                username: '',
                password: ''
            },
            // 表单验证规则 
            rules: {
                username: [{required: true, message: '请输入用户名/手机', trigger: 'blur'}],
                password: [{required: true, message: '请输入用户名/手机', trigger: 'blur'}]
            }
        }
    },
    methods: {
        handleLogin(){
            // 二次验证
            this.$refs.form.validate(valid => {
                if(valid){
                    // 接口
                    this.$axios({
                        url: '/accounts/login',
                        method: 'post',
                        data: this.form
                    })
                    .then(res => {
                        console.log(res)
                        this.$message.success('登录成功,正在为您跳转...')
                        setTimeout(() => {
                            // 存入store
                            this.$store.commit('user/setUserInfo', res.data)
                            this.$router.replace('/')
                            console.log(this.$store.state.user)
                        }, 3000)
                    })
                }else{
                    this.$message.warnign('请输入必填项')
                }
            })  
        }
    }
}
```

#### **2.3 创建 user.js**   --  /store/user.js ####

```js
export const state = () => ({
    // 存储登录成功用户数据
    userInfo: {}
})

export const mutations = {
    // 设置userInfo
    setUserInfo(state, data){
        state.userInfo = data
    },
    // 清除userInfo
    clearUserInfo(state){
        state.userInfo = ''
    }
}
```

#### 2.4 组件头部，右侧登录/注册的正确显示**  ---  components/header.vue  ####

> 通过判断是否有 token 来显示，若不存在 token 则显示 登录/注册 链接，反则显示用户头像，昵称相关布局

```html
<el-row type="flex" style="margin-left:15px;">
  <div v-if="$store.state.user.userInfo.token">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img
          :src="`${$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar}`"
          alt
        />
        {{$store.state.user.userInfo.user.nickname}}
        <i
          class="el-icon-arrow-down el-icon--right"
        ></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="handleExit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <div v-else>
    <nuxt-link to="/user/login">登录/注册</nuxt-link>
  </div>
</el-row>
```

#### 2.5 用户退出 ####

>在 components/header.vue 中处理设置退出方法，需在 /store/user.js - mutations 中设置清除用户数据

```js
<el-dropdown-item @click.native="handleExit">退出</el-dropdown-item>

-------------------------------------------------------------------
    
handleExit(){
  this.$store.commit('user/clearUserInfo')
  this.$message.success('退出成功')
  this.$router.replace('/user/login')
}
```

#### 2.6. 保存至本地

> 由于数据保存在缓存中，页面一刷新，数据则会不见，所以需要存储至本地

> 依靠 `vuex-persistedstate` 插件

##### **2.6.1 下载** #####

```js
npm install --save vuex-persistedstate
```

##### 2.6.2 在 `nuxt.config.js` 中的 `plugins` 中加入收下代码** #####

```js
plugins: [{ src: '~/plugins/localStorage.js', ssr: false }]
```

##### **2.6.3 在 plugins 文件夹中创建 localStorage.js** #####

```js
import createPersistedState from 'vuex-persistedstate'
// {store} 相当于 nuxt
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'login_user_info'
    })(store)
  })
}
```

####2.7 注册表单 components/registerForm.vue

> 创建注册表单组件结构，给表单绑定 `form` 对象，表单文本框双向绑定对应的 `from` 对象中的属性值，设置表单验证规则

> 点击发送验证码，需先判断手机号码是否为空、手机长度是否符合，符合，则调用获得验证码的接口，显示验证码

> 点击注册，需对表单进行二次验证，符合，则调用注册接口，成功则提示

##### 2.7.1 注册表单变量及方法设置** #####

> 两次密码是否一致 **可查看element-ui 中 Form表单的自定义校验规则**

```js
// data 中写入，与 return同级
var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== this.form.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
}
-----------------------------------------------
// rules 中
repassword: [{ validator: validatePass, trigger: "blur" }],
```

##### 2.7.2 完整的data #####

```js
data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    return {
      // 表单参数
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        repassword: ""
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" },
          { pattern:/\d{11}/, message: "请输入11位手机号码", trigger: "blur" },
          { pattern: /^1[358]\d{9}$/, message: "请输入以 13或15或18 开头的手机号码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [{ validator: validatePass, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    }
}
```

##### **2.7.3 获得验证码的方法** #####

```js
handleSendCode(){
  // 判断手机是否正确
  if(!this.form.username){
    this.$message.warning('请输入手机号')
    return
  }

  if(this.form.username.match(/\d{11}/)) {
    this.$message.warning('请输入正确的手机号格式（11位）')
    return
  }
    
  if(this.form.username.match(/^1[358]\d{9}$/)) {
    this.$message.warning('请输入以 13或15或18 开头的手机号码')
    return
  }

  // 接口
  this.$axios({
    url: '/captchas',
    method: 'post',
    data: {tel: this.form.username}
  })
  .then(res => {
    const {code} = res.data
    this.$alert(`验证码：${code}`, '提示', {
      confirmButtonText: '确定'
    })
  })
}
```

##### **2.7.4 注册的方法** #####

> 由于接口中接收的参数不含 `repassword`，则需将该属性值移除

> 可以通过解构的方法，解构出的 除 `repassword` 剩余的值 ------ **const {repassword, ...registerParams}**

```js
handleRegister(){
  // 二次验证
  this.$refs.form.validate(valid => {
    if(valid){
      // 取得对应参数
      const {repassword, ...registerParams} = this.form
      this.$axios({
        url: '/accounts/register',
        method: 'post',
        data: registerParams
      })
      .then(res => {
        this.$message.success('注册成功,正为你跳转')
        this.$store.commit('user/setUserInfo', res.data)
        setTimeout(() => {
          this.$router.replace('/')
        }, 3000)
      })
    }else{
      this.$message.warning('请输入必填项')
    }
  })
}
```

### 3. 拦截器插件 ###

> 在 plugins 文件夹中创建 axios.js

```js
import { Message } from "element-ui";

// aixos 拦截器
export default ( {$axios} ) => {
    // 错误拦截
    $axios.onError(res => {
        // 解构
        const {message, statusCode} = res.response.data
        if(statusCode === 400){
            Message.error(message)
        }
    })
}
```

> 在 nuxt.config.js 调用

```js
 plugins: [
     '@/plugins/element-ui',
     '@/plugins/axios', // 调用 axios
     { src: '~/plugins/localStorage.js', ssr: false }
 ]
```

### 4. 机票 -- air/index ###

> 创建搜索表单的组件， 嵌套在主页中

#### 4.1 搜索组件 searchForm.vue ####

> **出发城市及到达城市的制件** 使用 element-ui  input 输入框 中的 **远程搜索组件**

> 远程搜索组件 `el-autocomplete` 
>
> **`fetch-suggestions`**：返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
>
> **`select`** : 点击选中建议项时触发

##### 4.11 往返设置 （未开通） #####

```js
// tab切换时触发
handleSearchTab(item, index){
    if(index === 1){
        this.$alert('往返功能暂未开通', '提示', { confirmButtonText: '确定'})
    }
}
```

##### 4.12 出发、到达城市功能 #####

>只显示出发城市代码，到达城市类似
>
>通过**`fetch-suggestions`**绑定的函数，判断 **value** 的数据是否有，没有则不执行下面的代码，有，则调用实时机票接口，并通过绑定函数的回调返回数据，并设置第一个默认的显示（由于输入不点击选项会有bug，从而设置默认）

```js
 queryDepartSearch(value, cb){
    if(!value){
        cb([])
        return
    }
    // 调用封装的函数来调用接口
    this.searchFormInit(value, data => {
        // 调用
        cb(data)

        // 设置默认第一个显示
        this.form.departCity = data[0].value
        this.form.departCode = data[0].sort
    })
}
```

**封装调用机票接口的函数**

```js
// 封装调用接口函数
searchFormInit(value, callback){
    this.$axios({
        url: '/airs/city',
        params: {name: value }
    })
    .then(res => {
        console.log(res)
        const {data} = res.data

        // 处理为需要的form参数
        const temp = []
        data.forEach(e => {
            e.value = e.name.replace('市','')
            temp.push(e)
        })

        //回调
        callback(temp)
    })
}
```

##### 4.13 出发时间设置 #####

> 通过`v-mode`双向绑定 `form.departDate`，通过 moment 插件来设置时间格式

```js
// 需先引入
handleDate(value){
   this.form.departDate = moment(value).format('YYYY-MM-DD')
}
```

##### 4.14  出发城市、到达城市互换 #####

```js
handleReverse(){
    // 解构
    const {departCity, departCode, destCity, destCode} = this.form
    this.form.departCity = destCity
    this.form.departCode = destCode
    this.form.destCity = departCity
    this.form.destCode = departCode
}
```

##### 4.15 搜索按钮 #####

> 点击按钮，需先判断出发城市、到达城市及出发日期是否为空，否，提示，是，则跳转对应参数的机票列表页

```js
handleSubmit(){
    const {departCity, destCity, departDate} = this.form
    if(!departCity){
        this.$alert('请选择您要出发的城市', '提示', { confirmButtonText: '确定'})
        return
    }
    if(!destCity){
        this.$alert('请选择您要到达的城市', '提示', { confirmButtonText: '确定'})
        return
    }
    if(!departDate){
        this.$alert('请选择您要出发的日期', '提示', { confirmButtonText: '确定'})
        return
    }
    this.$router.replace({
        url: '/air/flights',
        query: this.form
    })
}
```

#### 4.2 推荐机票 ####

> 设置 ( `sales:[]` ) 数组接收调用特价机票接口返回的数据

```js
mounted () {
    this.$axios({
        url: '/airs/sale'
    })
        .then(res => {
        const {data} = res.data
        this.sales = data
    })
}
```

#### 4.3 机票列表 ####

> 在 pages 文件夹 创建机票列表组件 -- **flights.vue**，在机票列表组件中使用嵌套  **顶部条件组件、航班头部组件 -- flightsListHead.vue、航班信息组件 -- flightsItem.vue**

> 则需在机票列表组件 -- **flights.vue** 中 引入、注册、使用㠌套的组件

> 在机票列表组件 -- **flights.vue** 中，组件一加载便调用机票列表接口，设置变量接收调用接口返回的数据 **flightsData**，设置变量接收调用接口返回的数据中航班信息的数据 **flightsList**

> 通过组件传值，将 航班信息 传到航班信息组件，组件传值使用 **props** 设置 **data**属性

> 在机票列表组件 -- **flights.vue** 嵌套的 航班信息组件 -- **flightsItem.vue** ，使用v-for 遍历 **flightsList**，通过 **:data='item'** 传数据 ，在航班信息组件中修改对应属性，从而显示相应的航班信息

> 在航班信息组件中，需要计算**起飞与到达的相隔时间**，通过 **computed** --- **timeFormat**计算，设置对应的显示
>
> 当点击 **航班信息项** 时，显示对应的 **低价推荐项**，通过设置变量 **isShow: false**（默认全不显示），通过在 **航班信息项** 设置点击事件 **@click='isShow = !isShow'** ，**低价推荐项** 设置 **v-show='isShow'** 来实现需求

> 在机票列表组件 -- **flights.vue** 中  使用的 航班信息组件下设置分页
>
> 通过设置变量 **pageData** 来存储分页数据，设置变量**total （分页总记录数）、pageIndex（分页页码）、pageSize（分布每页显示条数）**
>
> 需将遍历的航班信息组件的遍历数据改为 **分页数据 -- pageData**，配置 分页组件 对应项的数据，配置 **handleSizeChange** 方法 及 **handleCurrentChange** 方法，分别设置 pageSize 、pageData（分页数据）的对应显示，及 pageIndex、pageData（分页数据）

##### 4.3.1 调用机票列表接口 #####

```js
// 变量设置 data 中
// 接口返回的数据
flightsData: {},
// 机票数据
flightsList: []
------------------------------------------------------------------
// 调用接口
mounted () {
    this.$axios({
        url: '/airs',
        params: this.$route.query
    })
    .then(res => {
        // 接口返回的数据
        this.flightsData = res.data
        // 机票列表数据
        this.flightsList = res.data.flights
        // console.log(res.data)
        // 分页数据
        this.pageData = this.flightsList.slice(0, this.pageSize)
        // 分页显示总记录数
        this.total = this.flightsList.length
    })
}
```

##### 4.3.2 组件传数据 #####

机票列表组件中 -- **flights.vue** 赋值给 data 属性

```html
<FlightsItem v-for='(item, index) in pageData' :key='index' :data='item' />
```

航班信息组件 -- **flightsItem.vue** 

```js
props: {
    // 数据
    data: {
        type: Object,
        // 默认是空数组
        default: {}
    }
}
```

通过 **data.xx** 来设置对应项的数据显示，如航空信息：**{{ data.airline_name }}**

##### 4.3.3 计算**起飞与到达的相隔时间** #####

```js
<el-col :span="8" class="flight-time">
    <span>{{ timeFormat }}</span>
</el-col>
--------------------------------------------------------------
computed: {
    timeFormat(){
        // 起飞，到达时间
        const dep = this.data.dep_time.split(':')
        const arr = this.data.arr_time.split(':')

        // 转化成分钟
        const depVal = dep[0] * 60 + +dep[1]
        const arrVal = arr[0] * 60 + +arr[1]

        // 起飞，到达差值
        let rankVal = arrVal - depVal

        // 当差值是负数时，可知道，时间会是明天了，得加上 24小时
        rankVal = rankVal < 0 ? rankVal + 24*60 : rankVal

        // 对应小时及分钟
        const hours = Math.floor(rankVal / 60)
        const min = rankVal % 60

        return `${hours}时 ${min}分`
    }
}
```

##### 4.3.4 分页的显示 #####

**设置分页相关变量及赋值对应的数据**

```js
// 变量设置 data
// 分页数据
pageData: [],
// 分页所需的变量
total: 0,
pageIndex: 1,
pageSize: 5
-------------------------------------------------------------------------------------
// 分页数据的赋值
mounted () {
    this.$axios({
        url: '/airs',
        params: this.$route.query
    })
        .then(res => {
        // 接口返回的数据
        this.flightsData = res.data
        // 机票列表数据
        this.flightsList = res.data.flights
        // console.log(res.data)
        // 分页数据
        this.pageData = this.flightsList.slice(0, this.pageSize)
        // 分页显示总记录数
        this.total = this.flightsList.length
    })
}
```

**将遍历的航班信息组件的遍历数据改为 分页数据 -- `pageData`**

```html
<FlightsItem v-for='(item, index) in pageData' :key='index' :data='item' />
```

**配置 `handleSizeChange` 方法 及`handleCurrentChange` 方法**

```js
handleSizeChange(val){
    this.pageSize = val
    // 对应数据显示
    this.pageData = this.flightsList.slice(0, val)
},
handleCurrentChange(val){
    this.pageIndex = val
    // 计算出对应显示的数据
    this.pageData = this.flightsList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
}
```

##### 4.3.5 条件过滤（筛选） #####

> 在 components/air 下创建 **flightsFilters.vue**，在 机票列表组件 -- **flights.vue** 引用、注册、使用

> 条件过滤组件 -- **flightsFilters.vue** 的数据显示
>
> 通过在  **flightsFilters.vue** 组件中设置 **props** ，在 **flights.vue** 使用的 条件过滤组件的地方 通过 **:data='flightsData'** 传数据

> 设置对应选择框改变事件 **@change** , 在该事件中设置一个发射的方法（$emit）传递对应文本框过滤条件对应的数据，且需在 **flights.vue** 使用条件过滤组件的地方进行事件监听,且在该监听的事件中设置分页对应显示的数据，并设置分页的正确显示

###### **组件的数据显示** ######

机型大小的数据需要自己配置

```js
// 机型数据
airSizeList: [
    {
        label: '大',
        value: 'L'
    },
    {
        label: '中',
        value: 'M'
    },
    {
        label: '小',
        value: 'S'
    }
]
```

在 **flightsFilters** 组件设置 props

```js
props:{
    // fliters组件传过来的条件过滤数据
    data:{
        type: Object,
        default: {}
    }
}
```

在 **flights.vue** 中

```html
<FlightsFilters :data='flightsData' />
```

需设置 flightsData ,由于在 **flightsFilters** 组件 中 通过 data.flights.xx 来渲染时，若没有在 flightsData 中设置对应数组中的空对象 -- info: {}，options: {}，**flights** 组件中 flightsData 加载没有 **flightsFilters** 组件 data.flights.xx 的快，则会出错  

```js
// 接口返回的数据
flightsData: {
    flights: [],
    info: {},
    options: {}
}
```

在 **flightsFilters** 组件 中，通过 data.xx 来设置或遍历出对应结构的数据显示，其它的数据显示即仿同时间的渲染，如下时间的遍历：

```js
<el-col :span="4">
    <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
        <el-option
        v-for='(item,index) in data.options.flightTimes'
        :key='index'
        :label="`${item.from}:00 - ${item.to}:00`"
        :value="`${item.from},${item.to}`"
        >
        </el-option>
    </el-select>
</el-col>
```

###### 机型的条件过滤 ######

在 **flights.vue** 使用条件过滤组件的地方进行事件监听

```html
<FlightsFilters :data='flightsData' @setFlitersData='setFlitersData' />
```

> 起飞机场、航空公司的条件过滤则仿同机型条件过滤

```js
handleAirSize(value){
    // 设置数据过滤，返回符合条件的数据数组
    let arr = this.data.flights.filter(v => {
        return v.plane_size === value
    })
	// 发射方法
    this.$emit('setFlitersData', arr)
}
```

>  **flights.vue** 中

```js
// flightsFilters组件 发射的方法
setFlitersData(arr){
    // 回到第一页
    this.pageIndex = 1
    // 显示对应的分页数据
    this.flightsList = arr
    // 分页总记录数
    this.total = arr.length
    // 分页
    this.pageData = this.flightsList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex*this.pageSize)
}
```

撤销条件  **flightsFilters** 组件中

```js
handleFiltersCancel(){
    // 重置数据
    this.airport = ""       
    this.flightTimes = ""   
    this.company = ""   
    this.airSize = ""
	// 发射事件，传入 原本的数据
    this.$emit('setFlitersData', this.data.flights)
}
```

##### 4.3.6 跳转至订单页 #####

> 在 **flightsItem** 组件 中 给 选定按钮添加事件进行跳转 -- handleLinkTo(item.seat_xid)

```html
<el-col :span="3" class="choose-button">
    <el-button 
    type="warning" 
    size="mini"
    @click='handleLinkTo(item.seat_xid)'>
    选定
    </el-button>
    <p>剩余：{{ item.discount }}</p>
</el-col>
```

```js
handleLinkTo(seat_xid){
    this.$router.replace({
        path: '/air/order',
        query: {id: this.data.id, seat_xid}
    })
}
```

##### 4.3.7  侧边栏 #####

> 在 air/components 下创建 flightsAside组件
>
> 在 **flights.vue** 中 引入、注册、使用

> 在 components/air 中 **searchForm.vue** 点击 搜索 按钮 存储参数到本地，则需先判断本地是否有该数据 ，再设置本地存储

> 在 **flightsAside组件** 中 获得本地数据， 设置变量，存储本地的数据，在结构中渲染结构

> 点击侧边栏的项，在同一组件中跳转（显示点击的数据），则需要在 **flights** 组件 中 添加侦听 **$route** 参数变化，实现数据刷新

****

**searchForm.vue** 中 搜索按钮事件 -- handleSubmit()

```js
// 本地存储搜索的数据
// 判断是否有数据
let airs = JSON.parse(localStorage.getItem('search_params_to_fliters')) || []

airs.push(this.form)
// 设置本地存储
localStorage.setItem('search_params_to_fliters', JSON.stringify(airs) )
```

在 **flightsAside组件** 中 

```js
mounted () {
    let arr = JSON.parse(localStorage.getItem('search_params_to_fliters')) || []
    this.asideData = arr
}
```

**渲染**

```html
nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" v-for="(item, index) in asideData" :key='index'>
    <el-row type="flex" 
    justify="space-between" 
    align="middle"
    class="history-item">
        <div class="air-info">
            <div class="to-from">{{ item.departCity }} - {{ item.destCity }}</div>
            <p>{{ item.departDate }}</p>
        </div>
        <span>选择</span>
    </el-row>
</nuxt-link>
```

在 **flights** 组件 中 添加侦听 **$route** 参数变化

```js
watch: {
    $route(){
        // 封装的调用接中的函数
        this.init()
    }
}
```

#### 4.4 订单列表 ####

> 在 pages/air 文件夹下 创建 order.vue
>
> 在 components/air 文件夹下 创建 orderForm.vue 、orderAside.vue
>
> 在 order 组件 中 嵌套 orderForm组件（订单表单）、orderAside组件（侧边栏）

##### 4.4.1 orderForm组件（订单表单） #####

> 根据 api 文档，在 orderForm组件中，创建表单提交所需的参数（data）中，将参数双向绑定到对应表单文本框位置

> 通过 **添加乘机人** 按钮事件 `handleAddUsers` 为 users 添加 {username: '', id: ''}对象，在对应结构中，通过遍历 users 来实现结构的添加显示
>
> 通过移除事件 `handleDeleteUser`  传入对应索引参数，users 数组通过 **splice** 方法实现对 对应的移除的结构的数据的删除操作

> 实现表单保险数据的遍历显示，
>
> 通过 `mounted` 钩子调用 **选择机票** 接口，传入对应的参数，
>
> 参数通过地址栏来获取 （解构 **this.$route.query** 获得 id、seat_xid），
>
> 调用接口成功返回的数据存储到 创建的变量 **airInfo** 中，
>
> 页面表单保险对应结构位置，通过遍历 **airInfo.insurances** 来实现渲染
>
> 通过 **change** 事件传入对应的 **id** 参数 来获得 表单参数 **insurances** 数组需要的 id

> 手机验证码的获取与交互验证，同注册组件的验证码获取一致

> 表单提交： 
>
> 通过设置 **data** 对象 来存储 机票表单提交所需的参数，通过 **地址栏** 可获取 所需的参数（id, seat_id），通过**二次验证表单**是否输入合格，否则 **return**，不执行以下代码；
>
> 成功，则调用 **提交机票订单** 接口，通过 **post** 方法，**headers** 来设置请求头 (获得 **token**)
>
> 成功，则提示并获得 **订单id** 且跳转至付款页

###### **表单参数设置** ######

```js
users: [
    {
        username: '',
        id: ''
    }
],
insurances: [],
contactName: '',
contactPhone: '',
invoice: false,
captcha: '',
// 接口返回的验证码
code: 0,
// 调用选择机票接口返回的数据
airInfo: {}
```

###### 添加乘机人 ######

```js
handleAddUsers(){
    this.users.push({
        username: '',
        id: ''
    })
}
```

###### 移除乘机人 ######

```js
handleDeleteUser(index){
    this.users.splice(index, 1)
}
```

###### 渲染表单保险结构 ######

**调用选择机票接口**

```js
mounted () {
    const {id, seat_xid} = this.$route.query
    // 调用选择机票接口
    this.$axios({
        url: 'airs/' + id,
        params: {seat_xid}
    })
    .then(res => {
        this.airInfo = res.data
        // console.log(res.data)
    })
}
```

**渲染结构**

```html
<div class="air-column">
    <h2>保险</h2>
    <div>
        <div class="insurance-item" v-for="(item, index) in airInfo.insurances" :key='index'>
            <el-checkbox @change="getInsurancesId(item.id)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万`" 
            border>
            </el-checkbox> 
        </div>
    </div>
</div>
```

**获得参数 insutances 所需的 id**

```js
getInsurancesId(id){
    // 判断是否含有数据的值
    const index = this.insurances.indexOf(id)
    if(index > -1){
        this.insurances.splice(index, 1)
    }else{
        this.insurances.push(id)
    }
    // console.log(this.insurances)
}
```

###### 手机验证码 ######

```js
handleSendCaptcha(){
    // 判断手机是否正确
    if(!this.contactPhone){
        this.$message.warning('请输入手机号')
        return
    }

    if(!this.contactPhone.match(/\d{11}/)) {
        this.$message.warning('请输入正确的手机号格式（11位）')
        return
    }

    // 接口
    this.$axios({
        url: '/captchas',
        method: 'post',
        data: {tel: this.contactPhone}
    })
    .then(res => {
        const {code} = res.data
        this.code = code
        this.$alert(`验证码：${code}`, '提示', {
            confirmButtonText: '确定'
        });
    })
}
```

###### 表单提交 ######

**获得并设置参数**

```js
const {id, seat_xid} = this.$route.query
// 接口参数
const data ={
    users: this.users,
    insurances: this.insurances,
    contactName: this.contactName,
    contactPhone: this.contactPhone,
    invoice: false,
    captcha: this.captcha,
    air: id,
    seat_xid
}
```

**表单验证**

```js
if(!this.users[0].username || !this.users[0].id){
    this.$message.warning('请输入乘机人信息')
    return
}
if(!this.contactName){
    this.$message.warning('请输入联系人')
    return
}
if(!this.contactName){
    this.$message.warning('请输入联系人')
    return
}
if(!this.contactPhone){
    this.$message.warning('请输入手机号')
    return
}

if(!this.contactPhone.match(/\d{11}/)) {
    this.$message.warning('请输入正确的手机号格式（11位）')
    return
}

if(this.code !== this.captcha) {
    this.$message.warning('验证码错误，请重新输入')
    this.captcha = ''
    return
}
```

**调用接口**

```js
const {token} = this.$store.state.user.userInfo
// 调用接口
this.$axios({
    url: '/airorders',
    method: 'post',
    headers: {Authorization: `Bearer ${token}`},
    data
})
.then(res => {
    this.$message.success('正在生成订单中...')

    const {id} = res.data.data
    // 跳转到付款组件
    this.$router.replace({
        path: '/air/pay',
        query: {id}
    })
})
```

##### 4.4.2 orderAside组件 ( 侧边栏 ) #####

> 在 store 文件夹 中 创建 **air.js** 来设置 state 存储 机票信息 **airInfo**

> 在 **orderForm组件** - **渲染表单保险结构** - **调用选择机票接口** 的 mouned 钩子 设置 操作 state 的函数来定义(传入) 机票信息 **airInfo**
>
> 在 **orderAside组件** 设置 **props** 属性 -- data 来绑定传入的数据
>
> 在 order 组件 使用 **orderAside组件** 的地方使用 props 定义的 data 绑定 state 的机票信息

> 计算总价格
>
> 在 store 文件夹 中 的 air.js 设置存储 总价格的变量 allPrice
>
> 通过  **orderForm组件** 设置 allPrice 方法来计算 总价格并使用 **commit** 来调用 **mutations** 操作函数来存储数据到 state 中的 allPrice 中

###### air.js ######

```js
// 存储
export const state = () => ({
    // 机票信息
    airInfo: {
        seat_infos: {}
    },
    // 总价格
    allPrice: 0
})
// 定义及操作state
export const mutations = {
    // 设置机票信息函数
    setAirInfo(state, data) {
        state.airInfo = data
    },
    // 设置总价格函数
    setAllPrice(state, price){
        state.allPrice = price
    }
}
```

###### 设置 操作 state 的函数来定义(传入) 机票信息 **airInfo** -- **orderForm组件** ######

```js
mounted () {
    const {id, seat_xid} = this.$route.query
    // 调用选择机票接口
    this.$axios({
        url: 'airs/' + id,
        params: {seat_xid}
    })
        .then(res => {
        this.airInfo = res.data
        // 存储至 state
        this.$store.commit('air/setAirInfo', this.airInfo)
    })
}
```

###### 计算总价格 -- **orderForm组件** ######

```js
computed: {
    allPrice(){
        // 若请求未完成，暂时不需计算，返回0
        if(!this.airInfo.seat_infos){
            return 0;
        }

        // 设置
        let price = 0
        // 机票单价
        price += this.airInfo.seat_infos.org_settle_price
        // 保险
        price += 30 * this.insurances.length
        // 燃油
        price += this.airInfo.airport_tax_audlet
        // 人数
        price *= this.users.length

        // 存储 state
        this.$store.commit('air/setAllPrice', price)
        return price
    }  
}
```

> `computed`计算属性的值如果在页面中没引用的话函数是不会执行的，所以需要在页面中调用下`allPrice`.
>
> 在 **orderForm组件** 的`template`中任意位置加入以下代码

```html
<!-- 引用总价格来触发计算属性 -->
<span v-show="false">{{allPrice}}</span>
```

#### 4.5 错误拦截（未登录） ####

> 通过在 plugins/axios.js 判断 状态若是 401 或是 403 ，则说明用户未登录
>
> 通过 在 nuxt 对象 解构出 重定向 (redirect) 来设置路由重定向至登录页
>
> 当用户登录成功，则返回上一页操作

**axios.js**

```js
export default ( {$axios, redirect} ) => {
    // 错误拦截
    $axios.onError(res => {
        // 解构
        const {message, statusCode} = res.response.data
        if(statusCode === 400){
            Message.error(message)
        }

        if(statusCode === 401 || statusCode === 403){
            Message.error('您未登录，请先登录...')
            redirect('/user/login')
        }
    })
}
```

**在 loginForm 组件中**

```js
handleLogin(){
    // 二次验证
    this.$refs.form.validate(valid => {
        if(valid){
            // 接口
            this.$store.dispatch('user/login', this.form).then(res => {
                this.$message({
                    type: 'success',
                    message: '登录成功,正在为您跳转...',
                    duration: 1000
                })
                setTimeout(() => {
                    // 返回上一页
                    this.$router.back()
                }, 1000)
            })
        }else{
            this.$message.warning('请输入必填项')
        }
    })  
}
```

#### 4.6 pay组件 (付款) ####

> 组件 付款金额的显示 

> 通过 npm install --save qrcode 下载 生成二维码插件

> 调用接口，引入并使用 qrcode 实现二维码生成

###### **组件 付款金额的显示  ** ######

```js
<div class="pay-title">
    支付总金额 <span class="pay-price">￥ {{$store.state.air.allPrice}}</span>
</div>
```

###### 调用接口，生成二维码  ######

```js
import QRcode from 'qrcode';
export default {
    mounted () {
        const {id} = this.$route.query
        // 调用微信付款接口
        // 由于该组件加载比存储在state加载快，所以当该组件加载时，token并未获取到，故而会出现报 401 情况，通过setTimeout使该组件延迟10毫秒加载
        setTimeout(() => {
        	const {token} = this.$store.state.user.userInfo
            this.$axios({
            url: '/airorders/' + id,
            headers: {Authorization: `Bearer ${token}`}
            })
            .then(res => {
                // console.log(res)
                // 获得参数
                const {code_url} = res.data.payInfo
                // 获得元素
                let canvas = document.getElementById('qrcode-stage')
                QRcode.toCanvas(canvas, code_url, {
                    width: 220
                })
            })
        },10)
    }
}
```

###### 调用查询付款状态接口实现支付结果轮询 ######

> 在 methods 创建 checkPay 方法来调用查询付款接口，并每三秒调用
>
> 在 mounted 钩子 调用微信付款接口 成功时，调用 checkPay 方法
>
> 通过 destoryed 钩子 清除定时器

 **创建 checkPay 方法**

设置 timer 变量 （data）

```js
checkPay(){
    // 每3秒调用查询付款状态接口
    this.timer = setInterval(() => {
        const {id} = this.$route.query
        const {token} = this.$store.state.user.userInfo

        this.$axios({
            url: '/airorders/checkpay',
            headers: {Authorization: `Bearer ${token}`},
            method: 'post',
            data: {id, nonce_str: this.order.price, out_trade_no: this.order.orderNo}
        })
        .then(res => {
            if(res.statusTxt === '支付成功'){
                // 清除定时
                clearInterval(this.timer)
                this.timer = null
                // 提示
                this.$alert('订单支付成功', '订单支付提示')
            }
        })

    }, 3000)
}
```

**调用 checkPay 方法**

```js
setTimeout(() => {
    const {token} = this.$store.state.user.userInfo
    this.$axios({
        url: '/airorders/' + id,
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
        console.log(res.data)
        // 获得参数
        const {code_url} = res.data.payInfo
        this.order = res.data
        // 获得元素
        let canvas = document.getElementById('qrcode-stage')
        QRcode.toCanvas(canvas, code_url, {
            width: 220
        })

        // 支付结果轮询
        this.checkPay()
    })
},10)
```

 **destoryed 钩子 清除定时器**

```js
destroyed () {
    clearInterval(this.timer)
    this.timer = null
}
```

