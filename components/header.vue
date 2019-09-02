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
        <el-row type="flex" class="aboutLogin">
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

        .aboutLogin{
            a{
                &:hover{
                    color: #409eff;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>