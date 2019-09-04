<template>
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
</template>

<script>
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
</script>

<style lang='less' scoped>
.login-wrap{
    background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
    height: 700px;
    min-width:1000px;

    .login-form{
        width:1000px;
        height: 100%;
        margin:0 auto;
        position: relative;
        
        .login-tab-wrap{
            width:400px;
            margin:0 auto;
            background:#fff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            overflow:hidden;
            
            .login-tabs{
                span{
                    display: block;
                    width:50%;
                    height: 50px;
                    box-sizing: border-box;
                    border-top:2px #eee solid;
                    background:#eee;
                    line-height: 48px;
                    text-align: center;
                    cursor: pointer;
                    color:#666;

                    &.active{
                        color:orange;
                        border-top-color: orange;
                        background:#fff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
  // .login-wrap{
  //   height: 700px;
  //   min-width: 1000px;
  //   background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;

  //   .login-form{
  //       width: 1000px;
  //       height: 100%;
  //       margin:0 auto;
  //       position: relative;
        
  //     .login-tab-wrap{
  //       width: 400px;
  //       margin:0 auto;
  //       background:#fff;
  //       box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  //       overflow:hidden;
  //       .login-tabs{
  //         span{
  //           flex: 1;
  //           height: 50px;
  //           box-sizing: border-box;
  //           border-top:2px #eee solid;
  //           background:#eee;
  //           line-height: 48px;
  //           text-align: center;
  //           cursor: pointer;
  //           color:#666;
  //           &.active{
  //             color:#f60;
  //             border-top-color: #f60;
  //             background:#fff;
  //             font-weight: bold;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
</style>