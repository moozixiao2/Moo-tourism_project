<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="banners">
      <el-carousel indicator-position="none" arrow="always">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div :style="`height:700px;background: url(${$axios.defaults.baseURL + item.url}) center center no-repeat;background-size:contain contain`"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- tab制作 -->
    <div class="tab-wrap">
      <el-row type="flex" class="tab-navs">
        <span v-for="(item, index) in tabOptions" :key='index' @click='handleClick(index)' :class="{active: current === index}"><i>{{ item.title }}</i></span>
      </el-row>
        <el-row type="flex" class="tab-input">
          <el-input :placeholder="tabOptions[current].placeholder">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前tab
      current: 0,
      //tab数据设置
      tabOptions:[
        {
          title: '攻略',
          placeholder: '请输入城市'
        },
        {
          title: '酒店',
          placeholder: '请输入城市 - 搜索城市'
        },
        {
          title: '机票',
          placeholder: ''
        }
      ],
      //轮播图图片数据
      banners: []
    }
  },
  methods: {
    handleClick(index){
      if(index === 2){
        this.$router.push('/air')
      }
      this.current = index
    }
  },
  mounted () {
    this.$axios({
      url: '/scenics/banners'
    })
    .then(res => {
      const { data } = res.data
      this.banners = data
    })
  }
}
</script>

<style lang='less' scoped>
.container{
  height: 700px;
  min-width: 1000px;
  position: relative;
  
  /deep/ .el-carousel__container{
    height: 700px;
    -webkit-filter: saturate(2); 
    filter: saturate(2);
  }
  .tab-wrap{
    z-index:9;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    width:552px;
    margin:0 auto;
    border-top:1px transparent solid;
  }

  .tab-navs{
    .active{
      i{
        color:#333;
      }
      &::after{
        background: #eee; 
      }
    }

    span{
        display:block;
        position: relative;
        width:82px;
        height:38px;
        margin-right:8px;
        cursor: pointer;

      i{
        position:absolute;
        z-index:2;
        display: block;
        width:100%;
        height:100%;
        line-height:30px;
        text-align:center;
        color:#fff;
      }

      &:after{
        position: absolute;
        left:0;
        top:0;
        display:block;
        content: "";
        width:100%;
        height:100%;
        border: 1px rgba(255,255,255,.2) solid;
        border-bottom: none;
        transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0,0,0,.5);
        border-radius:1px 2px 0 0;
        box-sizing:border-box;
      }
    }
  }

  .tab-input{
    width:550px;
    height:46px;
    line-height: 46px;
    background:#fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255,255,255,.2) solid;
    border-top:none;
    box-sizing: unset;

    /deep/ input{
      flex:1;
      outline: none;
      border:0;
      font-size:16px;
    }

    /deep/ .el-icon-search{
      cursor :pointer;
      line-height: 46px;
      font-size:22px;
      padding:0 10px;
      font-weight:bold;
    }
  }
}
</style>
