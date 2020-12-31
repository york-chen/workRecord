因为大数据投屏项目的元素基本就两种，要么是 文字、 要么就是 svg图像做的报表，这两种元素 都是矢量图，那么就可以利用矢量图的放大缩小来进行开发项目
阿里 的 datav项目也是利用的这个原理

先根据UI的设计稿 来设置界面的 宽度 和高度 ，然后其他的屏幕则会计算出来之后 自行放大或者缩小，当用户手动的改变了浏览器大小之后，监听事件，自动进行计算 缩放比例
设置好主div的尺寸和自动缩放之后，里面的内容可根据设计稿的像素进行1比1的开发，用设计稿的像素值即可，无需换算

参考链接 
```
重点就是 <div
      class="page"
      :style="{
        transform: `scale(${scale}) translate(-50%, -50%)`,
        width: width + 'px',
        height: height + 'px'
      }"
    >
    
    
    利用transform 进行缩放 和 内容居中


<template>
  <div class="page-wrap">
    <div
      class="page"
      :style="{
        transform: `scale(${scale}) translate(-50%, -50%)`,
        width: width + 'px',
        height: height + 'px'
      }"
    >
      <section class="top">
        <div class="img-wrap">
          <img src="../assets/images/bigDataReport/top.png" :style="{ width: width }" alt />
        </div>
      </section>
      <router-view />
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
export default {
  data() {
    this.width = 1920
    this.height = 960
    return {
      scale: this.getScale()
    }
  },
  methods: {
    getScale() {
      let ww = window.innerWidth / this.width
      let wh = window.innerHeight / this.height
      return ww < wh ? ww : wh
    },
    setScale: debounce(function() {
      this.scale = this.getScale()
    }, 500)
  },
  mounted() {
    window.addEventListener('resize', this.setScale)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setScale)
  }
}
</script>
<style lang="scss" scoped>
.page-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('../assets/images/bigDataReport/bg.jpg') no-repeat;
  background-size: cover;
  background-color: #030619;
  color: #fff;
  overflow: hidden;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px !important; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px !important;
    background: #2765c4 !important;
    cursor: pointer !important;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 3px !important;
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, 0.5) !important;
    background: #71fcff !important;
    cursor: pointer !important;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(240, 240, 240, 0.5) !important;
    border-radius: 0 !important;
    background: #2765c4 !important;
    cursor: pointer !important;
  }
}

.page {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;

  .top {
    // margin-bottom: 30px;

    img {
      margin: 0 auto;
    }
  }
}
</style>


