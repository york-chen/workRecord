# -
平时工作中记录一些 用到的 但是怕忘记的东西

1、aaa.html 和 index.html 是纯js实现的点击复制功能，aaa.html是别人写的demo 几乎所有的手机都支持，index.html是我自己照抄的，但是有些手机 不支持，以后有时间了再深入了解下

2、写h5 页面的时候 难免会遇到滚动穿透的问题 并且在 移动端 应该避免使用 position：fixed属性，因为ios支持得并不是很好。写网页的时候应该习惯性的加上 html,body{overflow:auto}这是为了让body 和 html 不会因为 里面的元素 滚动而位置发生变化。在ios端，填写当input框获取焦点后软键盘会弹起，失去焦点后，软键盘收起，却会造成页面底部留有一部分空白。 解决办法且看 modal.vue文件。

3，deepclone是一个深度拷贝的代码例子，不想每次都要写，记录一下
4，利用json.parse(json.stringify())这种方法来进行深度拷贝也是有不少弊端的。详情参考https://www.jianshu.com/p/b084dfaad501
5，vue做权限验证会用到vue-router的  addRoutes方法，但是当用户登出之后切换账号登录，会有坑，这个时候利用github大神偏方解决
      const createRouter = () => new VueRouter({
          mode: 'history',
          routes: [
              {
                  path: '/login',
                  component: HomeLayout,
                  children: HomeRoutes
              }
          ]
      });
      const routes = createRouter();

      function resetRouter() {
          const newRouter = createRouter();
          routes.matcher = newRouter.matcher // the relevant part
      }
将routes的matcher重置为初始值即可

6,做项目时遇到使用循环组件，因为模式一样，只有数据不一样。但是按照普通的组件调用格式来做时报错，错误信息为Unknown custom element: <pop> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

查询了官方文档，还有其他的资料，发现是循环调用组件时，组件比vue实例后创建，官方文档里写组件必须先于实例化引入，所以说组件没有正确的引入。

解决的方式是全局引入组件，并且在vue实例化前。

具体代码如下：若在项目中，一般是在main.js里引入

import pop from "@/views/popViews/pop.vue"
Vue.component('questionPop', questionPop)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
原文链接：https://blog.csdn.net/lx_1024/article/details/79260657
