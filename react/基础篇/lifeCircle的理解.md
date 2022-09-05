# 类式组件的生命周期

## 初次渲染

  - constructor 
    
    实例化React组件,初始化state，绑定this等

  - getDerivedStateFromProps(nextProps,prevState)

    为了代替componentWillMount和componentWillReceiveProps，把父组件新的props映射到state中并返回。

  - UNSAFE_componentWillMount
    
    不安全，可能造成副作用。

  - render 

    调和阶段、生成虚拟dom

  - componentDidMount

    commit之后 dom已经初始化完成

## 更新阶段

  - getDerivedStateFromProps() 

  - shouldComponentUpdate(nextProps,nextState)

    返回一个boolean值，如果是false，则不继续
     
  - render

  - getSnapShotBeforeUpdate(prevProps,prevState)

    render之后，还未commit，用来代替ComponentWillUpdate，获取更行dom前的快照，可以获取更新前的dom信息。返回值会作为componentDidUpdate的第三个参数。

  - componentDidUpdate(prevProps,prevState,snapShot)

    Dom已经更新

## 卸载阶段

  - ComponentWillUnmount

    可以清除定时器和事件监听器。

