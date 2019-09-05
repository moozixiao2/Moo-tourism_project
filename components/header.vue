<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录显示相关 -->
      <el-row type="flex" justify="space-between" class="aboutLogin">
        <el-row type="flex">
          <el-dropdown>
            <span class="el-dropdown-link">
              消息
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
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
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleExit() {
      // this.$store.commit("user/clearUserInfo");
      // 触发 actions
      this.$store.dispatch('user/exit')
      // 提示
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.replace("/user/login");
      }, 3000)
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  box-shadow: 0 0 3px #ddd;
  border-bottom: solid 1px #ddd;

  .main {
    width: 1000px;
    margin: 0 auto;

    .logo {
      width: 156px;
      padding-top: 9px;
      img {
        display: block;
        width: 100%;
      }
    }

    .navs {
      flex: 1;
      margin: 0 20px;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
        &:hover {
          color: #409eff;
          border-bottom: solid 5px #409eff;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }

    .aboutLogin {
      a {
        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: solid 3px #fff;
          vertical-align: middle;
        }
        &:hover img {
          border: solid 3px #409eff;
        }
      }
    }
  }
}
</style>