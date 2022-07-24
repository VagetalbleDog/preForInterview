/**
 * any类型与任何类型的交叉都是any
 */

type isAny<T> = "test" extends "test1" & T ? true : false;

type a = isAny<any>;

/**
 * never在条件类型中比较特殊，如果类型左边是类型参数，并且传入的是never，那么直接返回never
 */

type isNever<T> = [T] extends [never] ? true : false;

/**
 * 两个类型是否相等
 */
type isEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
/**
 * 元组是一种特殊的数字类型，但是每个元素是只读的，元组的['length']类型是数字字面量，而数组的['length']类型是number
 */
type notEqual<A,B> = A extends B ? (B extends A? false:true):true

type isTuple<T extends unknown[]> = T extends readonly [...element: infer type] ? notEqual<T["length"], number>:false;

/**
 * 联合类型转交叉类型
 */
type UnionToIntersection<U> = (U extends U? (x:U)=>unknown:never) extends (x:infer R)=>unknown?R:never;

type b = UnionToIntersection<{a:string}|{b:string}> extends {a:string,b:string}?true:false

/**
 * 可选类型的值为undefined和值类型的联合类型
 */

interface obj{
    a?:number,
    c:string,
    b?:boolean
}

//获取一个引用类型的可选类型,Pick是ts提供的内置高级类型，就是取出某个key构造新的索引类型
type getOptional<obj extends Object> = {
    [key in keyof obj as {} extends Pick<obj,key>?key:never]: obj[key]
}

const ccc:getOptional<obj> = {
    a:1,
    b:true   
}

/**
 * 获取一个类型中的所有非可选类型（必须类型）
 */
type getRequired<obj extends Record<string,any>> = {
    [key in keyof obj as {} extends Pick<obj,key>?never:key]:obj[key]
}

const required:getRequired<obj> = {
    c:'',
}

/**
 * 可索引签名
 */

type signature = {
  [key: string]: any;
  sleep():number;
};
const ff:signature = {
    sleep:()=>{return 1},
    s:1
}
//去除可索引签名
type RemoveSignature<obj extends Record<string,any>> = {
    [key in keyof obj as key extends `${infer str}`?str:never]
}

const fff:RemoveSignature<signature> = {
    sleep:()=>{return 1},
}

/**
 * keyof只能拿到class的public属性
 */
type getPublic<obj extends Record<string,any>> = {
    [key in keyof obj]:obj[key]
}

class test{
    public name:string
    protected age:number
    private hobbies:string

    constructor(){
        this.name = ''
        this.age = 18
        this.hobbies = ''
    }
    private say(){
        console.log(this.hobbies)
    }
}
type publicOfTest = getPublic<test>

/**
 * as const ts默认推理出的类型不是字面量类型，需要使用as const操作符，会推导出带有readonly的字面量类型
 */

const arr = [1,2,3] as const

type arr = typeof arr

