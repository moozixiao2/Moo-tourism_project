
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

export const actions = {
    // 定义触发 mutations 函数
    // 触发 setUserInfo
    login({commit}, data){
        return this.$axios({
            url: '/accounts/login',
            method: 'post',
            data
        }).then(res => {
            const data = res.data
            commit('setUserInfo', data)
            return data
        })
    },
    // 触发 clearUserInfo
    exit({commit}){
        return commit('clearUserInfo')
    }
}