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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图图片数据
      banners: []
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
  /deep/ .el-carousel__container{
    height: 700px;
  }
}
</style>
