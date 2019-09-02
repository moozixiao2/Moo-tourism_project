<template>
  <div>
    <!-- 头部 -->
    <Header />
    <nuxt />
    <!-- 底部 -->
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components: {
    Header, Footer
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  padding: 0;
  margin: 0;
}

a{
  color: inherit;
  text-decoration: none;
}

ul,li,ol{
  list-style: none;
}

i,em{
  font-style: normal;
}

a{
  color:inherit; 
  text-decoration: none;
}

a:hover{
  color:inherit; 
}
</style>
