# -
平时工作中记录一些 用到的 但是怕忘记的东西
1、aaa.html 和 index.html 是纯js实现的点击复制功能，aaa.html是别人写的demo 几乎所有的手机都支持，index.html是我自己照抄的，但是有些手机 不支持，以后有时间了再深入了解下

2、写h5 页面的时候 难免会遇到滚动穿透的问题 并且在 移动端 应该避免使用 position：fixed属性，因为ios支持得并不是很好。写网页的时候应该习惯性的加上 html,body{overflow:auto}这是为了让body 和 html 不会因为 里面的元素 滚动而位置发生变化  具体且看 modal.vue文件。
