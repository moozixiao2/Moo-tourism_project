
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