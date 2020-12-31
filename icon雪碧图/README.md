有时候UI同学偷个懒，给的全是icon的小图片。得有几十个吧，这个时候就需要拿出上古神器 雪碧图来说事儿了，虽然小图片可以被打包工具生成base64的data来代替，但是这些是没有缓存的，而且base64字符串很大，
也不太友好，我个人更倾向于弄雪碧图，以此记录

使用了 webpack-spritesmith 插件，网上一搜一大堆教程

//雪碧图，没办法，没有svg资源，就搞了个图片的
//这是写在 vue-cli的配置文件 vue-config.js的  chainWebpack模块
```
    config
      .plugin("webpack-spritesmith")
      .use(SpritesmithPlugin)
      .init(
        Plugin =>
          new Plugin({
            // 目标小图标
            src: {
              cwd: path.resolve(__dirname, "./src/assets/images/icon"),
              glob: "*.png"
            },
            // 输出雪碧图文件及样式文件
            target: {
              image: path.resolve(__dirname, "./src/assets/images/sprite.png"),
              css: [
                [
                  path.resolve(__dirname, "./src/assets/styles/sprite.css"),
                  {
                    format: "function_based_template"
                  }
                ]
              ]
            },
            // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
            customTemplates: {
              function_based_template: templateFunction
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
              cssImageRef: "../images/sprite.png"
            },
            spritesmithOptions: {
              algorithm: "top-down",
              padding: 10
            }
          })
      );
      ```
