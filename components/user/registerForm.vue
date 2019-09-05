<template>
  <div class="registerForm">
    <el-form :model="form" :rules="rules" ref="form" class="form">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码">
          <el-button slot="append" @click="handleSendCode">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type='password' placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input v-model="form.repassword" type='password' placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="registerBtn" @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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
  },
  methods: {
    // 发送验证码
    handleSendCode(){
      // 判断手机是否正确
      if(!this.form.username){
        this.$message.warning('请输入手机号')
        return
      }

      if(!this.form.username.match(/\d{11}/)) {
        this.$message.warning('请输入正确的手机号格式（11位）')
        return
      }

      if(!this.form.username.match(/^1[3|5|8]{9}$/)) {
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
        });
      })
    },
    // 注册
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
  }
};
</script>

<style lang="less" scoped>
.registerForm {
  .form {
    padding: 20px;
    .registerBtn {
      width: 100%;
    }
  }
}
</style>