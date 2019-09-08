<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                @blur="handleDepartBlur"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            // 
            depData: [],
            destData: [],
            // form 参数
            form: {
                departCity: '',
                departCode: '',
                destCity: '',
                destCode: '',
                departDate: ''
            },
            // tab
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$alert('往返功能暂未开通', '提示', { confirmButtonText: '确定'})
            }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, cb){
            if(!value){
                cb([])
                return
            }
            // 接口
            this.searchFormInit(value, data => {
                // 调用
                cb(data)

                // 设置默认第一个显示
                this.depData = data
                // this.form.departCity = data[0].value
                // this.form.departCode = data[0].sort
            })
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            if(!value){
                cb([])
                return
            }
            // 接口
            this.searchFormInit(value, data => {
                // 调用
                cb(data)

                // 设置默认第一个显示
                this.destData.data
                // this.form.destCity = data[0].value
                // this.form.destCode = data[0].sort
            })
            
        },
        // 封装调用接口函数
        searchFormInit(value, callback){
            this.$axios({
                url: '/airs/city',
                params: {name: value }
            })
            .then(res => {
                const {data} = res.data

                // 处理为需要的form参数
                const temp = []
                data.forEach(e => {
                    e.value = e.name.replace('市','')
                    temp.push(e)
                })

                //回调
                callback(temp)
            })
        },
        // 出发及到达文本框失焦
        handleDepartBlur(){
            this.form.departCity = this.depData[0].value
            this.form.departCode = this.depData[0].sort
        },
        handleDestBlur(){
            this.form.departCity = this.destData[0].value
            this.form.departCode = this.destData[0].sort
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCity = item.value
            this.form.departCode = item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value
            this.form.destCode = item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
           this.form.departDate = moment(value).format('YYYY-MM-DD')
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const {departCity, departCode, destCity, destCode} = this.form
            this.form.departCity = destCity
            this.form.departCode = destCode
            this.form.destCity = departCity
            this.form.destCode = departCode
        },

        // 提交表单是触发
        handleSubmit(){
           const {departCity, destCity, departDate} = this.form
           if(!departCity){
               this.$alert('请选择您要出发的城市', '提示', { confirmButtonText: '确定'})
               return
           }
           if(!destCity){
               this.$alert('请选择您要到达的城市', '提示', { confirmButtonText: '确定'})
               return
           }
           if(!departDate){
               this.$alert('请选择您要出发的日期', '提示', { confirmButtonText: '确定'})
               return
           }
           this.$router.replace({
               path: '/air/flights',
               query: this.form
           })

           // 本地存储搜索的数据
           // 判断是否有数据
           let airs = JSON.parse(localStorage.getItem('search_params_to_fliters')) || []
        
           airs.push(this.form)
           // 设置本地存储
           localStorage.setItem('search_params_to_fliters', JSON.stringify(airs) )
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
    cursor: pointer;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>