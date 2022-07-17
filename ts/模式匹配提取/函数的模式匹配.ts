//提取函数参数的类型
type getParmType<func extends Function> = func extends (...args:infer types)=>{} ?types:never;

const a: getParmType<(a: string, b: boolean, c: number) => {}> = [",", true, 1];

//提取函数返回值的类型
type getReturnType<func extends Function> = func extends (...args:any[])=>infer type?type:never;

const b: getReturnType<(a: string, b: boolean, c: number) => string> = "";

//获取调用函数的this的类型
type getThisType<func> = func extends (this:infer thisType,...args:any[])=>any ? thisType:unknown;

class Person{
    name:string;
    age:number;
    constructor(){
        this.name = 'zwf'
    }
    say(this:Person){
        console.log(this.name)
    }
}

const p1 = new Person();

type get = getThisType<typeof p1.say>

//获取构造器返回的的instance类型

/**
* 一个简单的构造器，用interface声明类型
 */
interface PersonConstructor{
    new(name:string,age:number):Person;
}

type getInstanceType<Constructor extends new (...args:any[])=>any> = Constructor extends new (...args:any[])=>infer instanceType?instanceType:never;

type p = getInstanceType<PersonConstructor>//Person

function makePerson(ct:PersonConstructor,name:string,age:number):p{
    return new ct(name,age)
}