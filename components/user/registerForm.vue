<template>
    <div class="registerForm">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="form"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" placeholder="验证码">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="registerBtn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 表单参数
            form: {
                username: '',
                captcha: '',
                nickname: '',
                password: '',
                repassword: ''
            },
            // 验证规则 
            rules: {
                username: [{ required: true, message: "请输入用户名/手机", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                repassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
                nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
                captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .registerForm{
        .form{
            padding: 20px;
            .registerBtn{
                width: 100%;
            }
        }
    }
</style>