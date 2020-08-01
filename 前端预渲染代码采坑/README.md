单页面为了解决seo的问题，有两种解决方案
1、做ssr （比较复杂，如果是现有的单页项目上进行改动，基本相当于是重做了）
2、做预渲染 （只对需要做seo的页面进行预渲染，基本不需要对现有代码进行改动，只需要修改webpack打包配置即可）

本文就是介绍预渲染


1、webpack添加配置

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          // 需要进行预渲染的路由路径 我这里做的是首页
          routes: ['/', '/query/report', '/business', '/about/jinniubang', '/about/others', '/about/contact'],
          // html文件压缩
          minify: {
            minifyCSS: true, // css压缩
            removeComments: true // 移除注释
          },
          //renderer这个配置其实完全可以不需要，并不像网上说的是必须的，只不过由于我的项目里面用到了插件，在预渲染的时候不需要进行初始化，真正访问的时候才需要，所以需要一个变量
          //来区分预渲染环境和真正的用户访问环境
          renderer: new Renderer({
            injectProperty: '__PRERENDER_INJECTED',//在window上注册对象__PRERENDER_INJECTED，并将inject的内容 注入到该对象上，仅预渲染环境可以访问，真正部署之后用户访问不到的
            inject: {
              isPrerender: true
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      )
      
      
      2、 修改main.js文件，添加 mounten钩子函数来触发 注入操作
      
       new Vue({
        router,
        store,
        render: h => h(App),
        mounted() {
          document.dispatchEvent(new Event('render-event'))
        }
      }).$mount('#app')
      
      3、在需要区分预渲染环境和用户访问环境的地方 调用变量
      
      export default {
        components: { HomeIndex, Business, Query, AboutUs },
        data() {
          const self = this
          return {
            flag: window.__PRERENDER_INJECTED, //如果是预渲染的话就不初始化fullpage，只有真正访问的时候才进行初始化，
            options: {....
            ....
      
          模板使用变量
          <full-page :skipInit="flag" :options="options" id="fullpage" ref="fullpage">
      
      
      
      
      
      
      
