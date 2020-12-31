elementui的scss 只提供了 6中颜色的button类型，当你的项目中这6中已经不满足需求的时候 就需要自己去添加啦

首先是覆盖样式文件，然后增加自己的 全局变量，
```
/* 改变主题色变量 */
$--color-primary: #386CF8;
$--color-info:#A3ACC8;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

//增加一种 gray的 button类型
$--color-gray:#B0B2B9;
$--button-gray-border-color: $--color-gray !default;
$--button-gray-background-color: $--color-gray !default;

@import "~element-ui/packages/theme-chalk/src/index";
$--button-gray-font-color: $--color-white !default;

.el-button--gray {
    color: $--button-gray-font-color;
    background-color: $--button-gray-background-color;
    border-color: $--button-gray-border-color;
}
//以下是从 elementui  button的scss代码里面提取出来的
@include b(button) {
    @include m(gray) {
        @include button-variant($--button-gray-font-color, $--button-gray-background-color, $--button-gray-border-color);
    }
}

@include b(button-group) {
    @each $type in gray {
        .el-button--#{$type} {
            &:first-child {
                border-right-color: rgba($--color-white, 0.5);
            }

            &:last-child {
                border-left-color: rgba($--color-white, 0.5);
            }

            &:not(:first-child):not(:last-child) {
                border-left-color: rgba($--color-white, 0.5);
                border-right-color: rgba($--color-white, 0.5);
            }
        }
    }
}
```
