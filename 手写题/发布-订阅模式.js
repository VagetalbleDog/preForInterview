class EventCenter{
  constructor(){
    this.events = new Map();
  }
  addEventLister(type,fn){
    //如果没有该事件就初始化一个fn列表
    if(!this.events.has(type)){
      this.events.set(type,[])
    }
    this.events.get(type).push(fn)
  }
  emit(type){
    if(!this.events.has(type)){
      console.log('没有这个事件')
      return;
    }
    for(const fn of this.events.get(type)){
      fn();
    }
  }
  removeEvent(type,fn){
    if (!this.events.has(type)) {
      console.log("没有这个事件");
      return;
    }
    const index = this.events.get(type).indexOf(cb=>fn===cb);
    this.events.get(type).splice(index,1)
  }
}
let eventCenter = new EventCenter();
eventCenter.addEventLister('hello',()=>{console.log('hello emit')})
eventCenter.addEventLister('hello',()=>{console.log('hello emit2')})

eventCenter.emit('hello')