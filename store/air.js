// 存储
export const state = () => ({
    // 机票信息
    airInfo: {
        seat_infos: {}
    },
    // 总价格
    allPrice: 0
})
// 定义及操作state
export const mutations = {
    // 设置机票信息函数
    setAirInfo(state, data) {
        state.airInfo = data
    },
    // 设置总价格函数
    setAllPrice(state, price){
        state.allPrice = price
    }
}