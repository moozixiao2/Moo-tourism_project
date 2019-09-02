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







####  ####