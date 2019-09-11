<template>
    <div class="loginForm">
        <el-form :model="form" ref="form" :rules="rules" class="form">
        <el-form-item class="form-item" prop="username">
            <el-input  v-model="form.username" placeholder="用户名/手机"></el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
            <el-input  v-model="form.password" placeholder="密码"  type="password" @keypress.enter.native="handleLogin"></el-input>
        </el-form-item>

        <p class="form-forget">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <!-- 登录按钮 -->
        <el-button class="loginBtn" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
    </div>
</template>

<script>
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
                    // this.$axios({
                    //     url: '/accounts/login',
                    //     method: 'post',
                    //     data: this.form
                    // })
                    // .then(res => {
                    //     console.log(res)
                    //     this.$message.success('登录成功,正在为您跳转...')
                    //     setTimeout(() => {
                    //         // 存入store
                    //         this.$store.commit('user/setUserInfo', res.data)
                    //         this.$router.replace('/')
                    //         console.log(this.$store.state.user)
                    //     }, 3000)
                    // })
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
    },
}
</script>

<style lang="less" scoped>
    .loginForm{
        .form{
            padding: 20px;
            .form-forget{
                text-align: right;
                font-size: 14px;
                color: #409EFF;
            }
            .loginBtn{
                width: 100%;
                margin-top: 15px;
            }
        }
    }
</style>