# 层叠上下文
我们假定用户正面向（浏览器）视窗或网页，而 HTML 元素沿着其相对于用户的一条虚构的 z 轴排开，层叠上下文就是对这些 HTML 元素的一个三维构想。众 HTML 元素基于其元素属性按照优先级顺序占据这个空间。

# 层叠上下文的形成条件

文档中的层叠上下文由满足以下任意一个条件的元素形成：

 - 文档根元素 html
 - position 值为 absolute（绝对定位）或 relative（相对定位）且 z-index 值不为 auto 的元素；
 - position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）；
 - flex (flex) 容器的子元素，且 z-index 值不为 auto；
 - grid (grid) 容器的子元素，且 z-index 值不为 auto；
 - opacity 属性值小于 1 的元素（参见 the specification for opacity）；
 - mix-blend-mode 属性值不为 normal 的元素；
 - 以下任意属性值不为 none 的元素：
   - transform
   - filter
   - backdrop-filter
   - perspective
   - clip-path
   - mask / mask-image / mask-border
 - isolation 属性值为 isolate 的元素；
 - will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素（参考这篇文章）；
 - contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 - - - - contain: strict、contain: content）的元素。
  

在层叠上下文中，子元素同样也按照上面解释的规则进行层叠。重要的是，其子级层叠上下文的 z-index 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

# 什么是“层叠等级”


**在同一个层叠上下文中，它描述定义的是该层叠上下文中的层叠上下文元素在Z轴上的上下顺序。**

**在其他普通元素中，它描述定义的是这些普通元素在Z轴上的上下顺序。**

```
具象的比喻：我们之前说到，处于层叠上下文中的元素，就像是元素当了官，等级自然比普通元素高。再想象一下，假设一个官员A是个省级领导，他下属有一个秘书a-1，家里有一个保姆a-2。另一个官员B是一个县级领导，他下属有一个秘书b-1，家里有一个保姆b-2。a-1和b-1虽然都是秘书，但是你想一个省级领导的秘书和一个县级领导的秘书之间有可比性么？甚至保姆a-2都要比秘书b-1的等级高得多。谁大谁小，谁高谁低一目了然，所以根本没有比较的意义。只有在A下属的a-1、a-2以及B下属的b-1、b-2中相互比较大小高低才有意义。
```

再类比回“层叠上下文”和“层叠等级”，就得出一个结论：

普通元素的层叠等级优先由其所在的层叠上下文决定。
层叠等级的比较只有在当前层叠上下文元素中才有意义。不同层叠上下文中比较层叠等级是没有意义的。

栗子1:
有两个div，p.a、p.b被包裹在一个div里，p.c被包裹在另一个盒子里，只为.a、.b、.c设置position和z-index属性
```
<style>
  div {  
    position: relative;  
    width: 100px;  
    height: 100px;  
  }  
  p {  
    position: absolute;  
    font-size: 20px;  
    width: 100px;  
    height: 100px;  
  }  
  .a {  
    background-color: blue;  
    z-index: 1;  
  }  
  .b {  
    background-color: green;  
    z-index: 2;  
    top: 20px;  
    left: 20px;  
  }  
  .c {  
    background-color: red;  
    z-index: 3;  
    top: -20px;  
    left: 40px;  
  }
</style>

<body>  
  <div>  
    <p class="a">a</p>  
    <p class="b">b</p>  
  </div> 

  <div>  
    <p class="c">c</p>  
  </div>  
</body> 
```
效果：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/30/165890e9dcadf485~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

因为p.a、p.b、p.c三个的父元素div都没有设置z-index，所以不会产生层叠上下文，所以.a、.b、.c都处于由```<html></html>```标签产生的“根层叠上下文”中，属于同一个层叠上下文，此时谁的z-index值大，谁在上面。
栗子2：
有两个div，p.a、p.b被包裹在一个div里，p.c被包裹在另一个盒子里，同时为两个div和.a、.b、.c设置position和z-index属性
```
<style>
  div {
    width: 100px;
    height: 100px;
    position: relative;
  }
  .box1 {
    z-index: 2;
  }
  .box2 {
    z-index: 1;
  }
  p {
    position: absolute;
    font-size: 20px;
    width: 100px;
    height: 100px;
  }
  .a {
    background-color: blue;
    z-index: 100;
  }
  .b {
    background-color: green;
    top: 20px;
    left: 20px;
    z-index: 200;
  }
  .c {
    background-color: red;
    top: -20px;
    left: 40px;
    z-index: 9999;
  }
</style>

<body>
  <div class="box1">
    <p class="a">a</p>
    <p class="b">b</p>
  </div>

  <div class="box2">
    <p class="c">c</p>
  </div>
</body>
```
效果：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/30/165890ecb78125b2~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

虽然p.c元素的z-index值为9999，远大于p.a和p.b的z-index值，但是由于p.a、p.b的父元素div.box1产生的层叠上下文的z-index的值为2，p.c的父元素div.box2所产生的层叠上下文的z-index值为1，所以p.c永远在p.a和p.b下面。
同时，如果我们只更改p.a和p.b的z-index值，由于这两个元素都在父元素div.box1产生的层叠上下文中，所以，谁的z-index值大，谁在上面。

# 什么是“层叠顺序”
说完“层叠上下文”和“层叠等级”，我们再来说说“层叠顺序”。“层叠顺序”(stacking order)表示元素发生层叠时按照特定的顺序规则在Z轴上垂直显示。由此可见，前面所说的“层叠上下文”和“层叠等级”是一种概念，而这里的“层叠顺序”是一种规则。

在不考虑CSS3的情况下，当元素发生层叠时，层叠顺讯遵循上面途中的规则。
这里值得注意的是：

  - 左上角"层叠上下文background/border"指的是层叠上下文元素的背景和边框。
  - inline/inline-block元素的层叠顺序要高于block(块级)/float(浮动)元素。
  - 单纯考虑层叠顺序，z-index: auto和z-index: 0在同一层级，但这两个属性值本身是有根本区别的。

# 判断元素层级的套路

  - 1、首先先看要比较的两个元素是否处于同一个层叠上下文中
      
    - 如果是，谁的层叠等级大，谁在上面
  
    - 如果两个元素不在统一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。

  - 2、当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。