# 1. react fiber（时间片）

https://juejin.cn/post/6844903975112671239

https://juejin.cn/post/6844903592831238157

**为了实现进程的并发，操作系统会按照一定的调度策略，将CPU的执行权分配给多个进程，多个进程都有被执行的机会，让它们交替执行，形成一种“同时在运行”假象**

进程调度方法：

1. 先到先得
2. 时间片轮转，不好确定时间片。
3. 最短进程优先。问题是大量短进程。
4.  **最高响应比优先(HRRN)**，响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间

Javascript 引擎是单线程运行的。 严格来说，Javascript 引擎和页面渲染引擎在同一个`渲染线程`，GUI 渲染和 Javascript执行 两者是互斥的。

![image-20220801145607419](C:\Users\fujiaxu\AppData\Roaming\Typora\typora-user-images\image-20220801145607419.png)

**React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们, 一气呵成。这个过程 React 称为 `Reconcilation`(中文可以译为`协调`)**.

在 Reconcilation 期间，React 会霸占着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可以感知到这些卡顿。

React 的 Reconcilation 是CPU密集型的操作, 它就相当于我们上面说的’长进程‘。所以初衷和进程调度一样，我们要让高优先级的进程或者短进程优先运行，不能让长进程长期霸占资源。

**所以 React 通过Fiber 架构，让自己的Reconcilation 过程变成可被中断。 '适时'地让出CPU执行权**

React Fiber 的思想和协程的概念是契合的: **🔴React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染**。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/21/16deed1711f281b3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



fiber 数据结构

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/21/16deecc6db5530be~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



Fiber 和调用栈帧一样, 保存了节点处理的上下文信息，因为是手动实现的，所以更为可控，我们可以保存在内存中，随时中断和恢复。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/21/16deecca7850a24d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

使用最新的 React 版本(v16), 使用 Chrome 的 Performance 工具，可以很清晰地看到每次渲染有两个阶段：`Reconciliation`(协调阶段) 和 `Commit`(提交阶段)。

除了Fiber 工作单元的拆分，两阶段的拆分也是一个非常重要的改造，在此之前都是一边Diff一边提交的。