class Subject{
    constructor(name='zwf'){
        this.state = 100;
        this.name = name;
        this.observers = []//多个观察者
    }
    addObserver(observer){
        this.observers.push(observer)
    }
    alterNateState(state){
        this.state = state;
        this.observers.forEach((ob)=>{
            ob.update(this)
        })
    }
}

class Observer{
    constructor(name){
        this.name = name;
    }
    update(subject){
        console.log(`收到通知，${subject.name} 的 吊瓶 还剩 ${subject.state}`)
    }
}

let patient = new Subject('1');
let patient2 = new Subject('2');
let doctor = new Observer('doc')

patient.observers.push(doctor);
patient2.addObserver(doctor);

patient.alterNateState(3)
patient2.alterNateState(50)