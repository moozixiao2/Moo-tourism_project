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
      current: 0
    }
  }
}
```

####登录表单 components/loginForm.vue

####注册表单 components/registerForm.vue

