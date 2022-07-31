# 1. 标签语义化

[如何理解HTML结构的语义化？ - 简书 (jianshu.com)](https://www.jianshu.com/p/6bc1fc059b51)

# 2. display:none 和 visibility:hidden的区别

前者不占据空间，但是会在html中有展示 

后者占据空间 

visibility不会触发重绘(repaint)和重排(reflow)

```js
visibility具有继承性，给父元素设置visibility:hidden;子元素也会继承这个属性。但是如果重新给子元素设置visibility: visible,则子元素又会显示出来。这个和display: none有着质的区别。

CSS3的transition支持visibility属性，但是并不支持display，由于transition可以延迟执行，因此可以配合visibility使用纯css实现hover延时显示效果。提高用户体验。
```

# 3.  z-index 什么时候会失效

1、问题标签无position属性（不包括static）； 

2、问题标签含有浮动(float)属性。

 3、问题标签的祖先标签的z-index值比较小。

# 4. CSS为什么要放在头部

[为什么外链css要放在头部，js要放在尾部？ - 掘金 (juejin.cn)](https://juejin.cn/post/6844904009694707725#heading-0)

# 5. 手机端布局的方法

# 6. meta 标签

# 7. script中的 defer 和 async 有什么区别。

# 8. HTML5新增了哪些

# 9. cavans 和 svg的区别







