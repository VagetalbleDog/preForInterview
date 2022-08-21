class Subject{
    constructor(name){
        this.name = name;
        this.observers = [];
        this.state = 100
    }
    addObserver(observer){
        this.observers.push(observer)
    }
    alterNateState(alterNateState){
        this.state = alterNateState;
        for(const observer of this.observers){
            observer.received(this)
        }
    }
}

class Observer{
    constructor(name){
        this.name = name;
        this.Subjects = [];
    }
    received(sub){
        console.log(`观察到${sub.name}的状态变化为${sub.state}`)
    }
}
let patient = new Subject('1');
let patient2 = new Subject('2');
let doctor = new Observer('doc')

patient.observers.push(doctor);
patient2.addObserver(doctor);

patient.alterNateState(3)
patient2.alterNateState(50)