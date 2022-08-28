# 1. flex布局

[Flex 布局教程：语法篇 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2015/07/flex-grammar.html)

设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

flex布局分为：flex容器 和 flex项目

![image-20220731162112742](D:\秋招\共同复习\preForInterview\CSS.assets\image-20220731162112742.png)

开启flex

```css
div {
	display: flex;
}
```

![image-20220731165101156](D:\秋招\共同复习\preForInterview\CSS.assets\image-20220731165101156.png)

![image-20220731165248420](C:\Users\fujiaxu\AppData\Roaming\Typora\typora-user-images\image-20220731165248420.png)

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

![image-20220731165443412](D:\秋招\共同复习\preForInterview\CSS.assets\image-20220731165443412.png)

其中常问道的是：flex:1 和 flex: 0 的区别。

[一文搞懂flex:0,1,auto,none - 掘金 (juejin.cn)](https://juejin.cn/post/7061196914741477383)

![image-20220731165959366](D:\秋招\共同复习\preForInterview\CSS.assets\image-20220731165959366.png)

# 2. 移动端布局的方式

1. 媒体查询 + rem
2. vh vw
3. flexable.js (? 忘记了)

# 3. 水平垂直居中布局

1. flex
2. 绝对定位 + transform
3. 绝对定位 + 设置宽高
4. 记不得了

# 4. BFC

1. 什么是BFC

   浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, tablecells, 和 table-captions），以及overflow值不为"visiable"的块级盒子，都会为他们的内容创建新的 BFC（Block Fromatting Context， 即块级格式上下文）。我的理解就是一个独立的布局块。

2. 如何触发

   根元素() 

   浮动元素（元素的 float 不是 none） 

   绝对定位元素（元素的 position 为 absolute 或 fixed） 

   行内块元素（元素的 display 为 inline-block） 

   表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值） 

   表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值） 

   匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-headergroup、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table） 

   overflow 值不为 visible 的块元素 

   弹性元素（display为 flex 或 inline-flex元素的直接子元素） 

   网格元素（display为 grid 或 inline-grid 元素的直接子元素） 等等。

3. BFC渲染规则

   （1）BFC垂直方向边距重叠 

   （2）BFC的区域不会与浮动元素的box重叠 

   （3）BFC是一个独立的容器，外面的元素不会影响里面的元素 

   （4）计算BFC高度的时候浮动元素也会参与计算

4. 有什么用

   1. 清楚浮动
   2. 解决高度塌陷
   3. 上边距重叠
   4. 左边固定，右边自适应布局

# 5. 画三角形

# 6. 盒子模型

```css
/* 红色区域的大小是多少？200 - 20*2 - 20*2 = 120 */
.box {
width: 200px;
height: 200px;
padding: 20px;
margin: 20px;
background: red;
border: 20px solid black;
box-sizing: border-box; }
/* 标准模型 */
box-sizing:content-box;
/*IE模型*/
box-sizing:border-box;

```

# 7. css品字布局

```css
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>品字布局</title>
<style>
* {
margin: 0;
padding: 0;
}
body {
overflow: hidden;
}
div {
margin: auto 0;
width: 100px;
height: 100px;
background: red;
font-size: 40px;
line-height: 100px;
color: #fff;
text-align: center;
}
.div1 {
margin: 100px auto 0;
}
.div2 {
margin-left: 50%;
background: green;
float: left;
效果:
第二种(全屏版)
transform: translateX(-100%);
}
.div3 {
background: blue;
float: left;
transform: translateX(-100%);
}
</style>
</head>
<body>
<div class="div1">1</div>
<div class="div2">2</div>
<div class="div3">3</div>
</body>
</html>
```

# 8. 画一个圆形加载条

待补充

# 9. css层级

[彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index - 掘金 (juejin.cn)](https://juejin.cn/post/6844903667175260174)





