/**
 * Parameters用于提取函数类型的参数类型
 */

//源码中的实现类似于如下
declare type Parameter<func extends (...args)=>any> = func extends (...args:infer type)=>any?type:never;

function a(s:string,n:number):string[]{
    return ['1','2']
}
const Parameters:Parameters<typeof a> = ['',1]

/**
 * ReturnType用于获取函数返回值的类型
 */

//源码中的实现类似于如下
type Return_Type<func extends Function> = func extends (...args:any[])=>infer type?type:never;

const returns:Return_Type<typeof a> = ['1','s']

/**
 * constructorParameters获取构造器的类型
 */
interface Person{
    new(name:string,age:number)
}
//源码中的实现如下
type constructorParameters<func extends abstract new (...args:any)=>any> = func extends abstract new (...args:infer p)=>any?p:never;

const constructorParameter:constructorParameters<Person> = ['',1]

/**
 * ThisParameterType 提取函数中this的指向
 */
//源码中的实现如下
type thisParameterType<func> = func extends (this:infer p,...rest:any)=>any?p:unknown;


/**
 * Partial 将所有的key设置为可选
 */

interface test{
    a:string,
    b:number,
    c?:boolean
}

const c:Partial<test> = {
}

/**
 * Required 将所有的key设置为必需
 */
const t:Required<test> = {
    a:'',
    b:1,
    c:true
}

/**
 * ReadOnly 将所有的值设置为readonly
 */
//源码实现如下
type ReadOnly<obj extends Record<string,any>> = {
    readonly [key in keyof obj]:obj[key]
}

/**
 * Pick对key进行过滤
 */
//源码中的实现
type pick<obj,k extends keyof obj> = {
    [key in k]:obj[key]
}
const d:Pick<test,'a'|'c'> = {
    a:'',
}

/**
 * Exclude 从一个联合类型中去掉一些类型
 */
type exclude<union,remove> = union extends union?union extends remove?never:union:never

type a = number|string|boolean;

type b = exclude<a,string>