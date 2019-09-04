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

### 首页 ###

####轮播图制作

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

#### tab切换

>通过设置 tab 切换的数据数组，在 `span` 标签中遍历，设置显示的 `span` 切换

> 在 `input` 中动态判定 tab当前数据索引中的 `placeholder`，实现切换

> 设置 `span` 的点击事件，将对应的索引赋给 `current`，并判断 `index`等于 **2** （机票）时，跳转至机票的页面

>通过动态绑定 `span` 的 class 来设置当前点击的 tab 高亮显示

**布局设置**

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

**data设置**

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

### 登录组件

> 登录页面是由标签页组成的 **登录 - 注册** 切换，通过点击标签显示对应的表单

>因此可以在登录组件页面设置标签页标签的切换功能

> 而登录及注册的表单则可以分离出两个组件，登录组件则引入 - 注册 - 使用并判断即可

**登录组件设置**

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

**script设置**

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

####登录表单 components/loginForm.vue

> 创建登录表单组件、给表单绑定 `form` 对象，对应文本框双向绑定 `form` 对象中的属性，设置表单验证规则 `rules` 

> 点击登录按钮，需对表单二次验证，验证符合，则调用登录接口，传入对应参数 `this.form`，登录成功给出提示，需把用户登录数据存储到 `store` 中

> 在 **store 文件夹中创建 user.js** 设置 `store`

**登录表单变量及方法设置**

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
                        setTimeout(() => {
                            this.$message.success('登录成功,正在为您跳转...')
                            // 存入store
                            this.$store.commit('user/setUserInfo', res.data)
                            this.$router.push('/')
                            console.log(this.$store.state.user)
                        }, 1000)
                    })
                }else{
                    this.$message.warnign('请输入必填项')
                }
            })  
        }
    }
}
```

**创建 user.js**   --  /store/user.js

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

**组件头部，右侧登录/注册的正确显示**  ---  components/header.vue 

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



**用户退出**

>在 components/header.vue 中处理设置退出方法，需在 /store/user.js - mutations 中设置清除用户数据

```js
<el-dropdown-item @click.native="handleExit">退出</el-dropdown-item>

-------------------------------------------------------------------
    
handleExit(){
  this.$store.commit('user/clearUserInfo')
  this.$message.success('退出成功')
  this.$router.push('/user')
}
```

#### 保存至本地

> 由于数据保存在缓存中，页面一刷新，数据则会不见，所以需要存储至本地

> 依靠 `vuex-persistedstate` 插件

**下载**

```js
npm install --save vuex-persistedstate
```

**在 `nuxt.config.js` 中的 `plugins` 中加入收下代码**

```js
plugins: [{ src: '~/plugins/localStorage.js', ssr: false }]
```

**在 plugins 文件夹中创建 localStorage.js**

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

####注册表单 components/registerForm.vue

> 创建注册表单组件结构，给表单绑定 `form` 对象，表单文本框双向绑定对应的 `from` 对象中的属性值，设置表单验证规则

> 点击发送验证码，需先判断手机号码是否为空、手机长度是否符合，符合，则调用获得验证码的接口，显示验证码

> 点击注册，需对表单进行二次验证，符合，则调用注册接口，成功则提示

**注册表单变量及方法设置**

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

**完整的data**

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
          { pattern: /^1[3|5|8]{9}$/, message: "请输入以 13或15或18 开头的手机号码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [{ validator: validatePass, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    }
}
```

**获得验证码的方法**

```js
handleSendCode(){
  // 判断手机是否正确
  if(!this.form.username){
    this.$message.warning('请输入手机号')
    return
  }

  if(this.form.username.length !== 11) {
    this.$message.warning('请输入正确的手机号格式（11位）')
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
    });
  })
}
```

**注册的方法**

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
          this.$router.push('/')
        }, 2000)
      })
    }else{
      this.$message.warning('请输入必填项')
    }
  })
}
```

