<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{$store.state.air.allPrice}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRcode from 'qrcode';
export default {
    data() {
        return {
            // 订单数据
            order: {},
            // 时间
            timer: null
        }
    },
    mounted () {
        const {id} = this.$route.query
        // 调用微信付款接口
        // 由于该组件加载比存储在state加载快，所以当该组件加载时，token并未获取到，故而会出现报 401 情况，通过setTimeout使该组件延迟10毫秒加载
        setTimeout(() => {
            const {token} = this.$store.state.user.userInfo
            this.$axios({
                url: '/airorders/' + id,
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(res => {
                console.log(res.data)
                // 获得参数
                const {code_url} = res.data.payInfo
                this.order = res.data
                // 获得元素
                let canvas = document.getElementById('qrcode-stage')
                QRcode.toCanvas(canvas, code_url, {
                    width: 220
                })

                // 支付结果轮询
                this.checkPay()
            })
        },10)
    },
    methods: {
        checkPay(){
            // 每3秒调用查询付款状态接口
            this.timer = setInterval(() => {
                const {id} = this.$route.query
                const {token} = this.$store.state.user.userInfo
                
                this.$axios({
                    url: '/airorders/checkpay',
                    headers: {Authorization: `Bearer ${token}`},
                    method: 'post',
                    data: {id, nonce_str: this.order.price, out_trade_no: this.order.orderNo}
                })
                .then(res => {
                    if(res.statusTxt === '支付成功'){
                        // 清除定时
                        clearInterval(this.timer)
                        this.timer = null
                        // 提示
                        this.$alert('订单支付成功', '订单支付提示')
                    }
                })
                
            }, 3000)
        }
    },
    destroyed () {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>