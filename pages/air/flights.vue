<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data='flightsData' @setFlitersData='setFlitersData' />
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem v-for='(item, index) in pageData' :key='index' :data='item' />
                    <!-- 分页 -->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside />
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"

export default {
    components:{
        FlightsListHead, FlightsItem, FlightsFilters, FlightsAside
    },
    data(){
        return {
            // 接口返回的数据
            flightsData: {
                flights: [],
                info: {},
                options: {}
            },
            // 机票数据
            flightsList: [],
            // 分页数据
            pageData: [],
            // 分页所需的变量
            total: 0,
            pageIndex: 1,
            pageSize: 5
        }
    },
    methods: {
        // flightsFilters组件 发射的方法
        setFlitersData(arr){
            // 回到第一页
            this.pageIndex = 1
            // 显示对应的分页数据
            this.flightsList = arr
            // 分页总记录数
            this.total = arr.length
            // 分页
            this.pageData = this.flightsList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex*this.pageSize)
        },
        // 分页
        handleSizeChange(val){
            this.pageSize = val
            // 对应数据显示
            this.pageData = this.flightsList.slice(0, val)
        },
        handleCurrentChange(val){
            this.pageIndex = val
            // 计算出对应显示的数据
            this.pageData = this.flightsList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
        },
        // 封装调用接口返回数据的方法
        init(){
            this.$axios({
                url: '/airs',
                params: this.$route.query
            })
            .then(res => {
                console.log(res.data)
                // 接口返回的数据
                this.flightsData = res.data
                // 机票列表数据
                this.flightsList = res.data.flights
                // console.log(res.data)
                // 分页数据
                this.pageData = this.flightsList.slice(0, this.pageSize)
                // 分页显示总记录数
                this.total = this.flightsList.length
            })
        }
    },
    watch: {
        $route(){
            this.init()
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>