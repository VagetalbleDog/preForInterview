interface test{
    name:string
    age?:number;
    readonly sex:boolean;
}

type person= {
    name:'zwf',
    age:18,
    sex:true
}

/**
 * 将对value进行操作,重复三遍name属性值
 */
type reSayThreeName<obj extends test> = {
  [key in keyof obj]: key extends "name" ? `${obj[key]}${obj[key]}${obj[key]}` : obj[key];
};

const p1:reSayThreeName<person> = {
    name:'zwfzwfzwf',
    age:18,
    sex:true
}

/**
 * 对key进行操作，把key全部变为大写
 */
type uppercaseKey<obj extends Object> = {
    [key in keyof obj as Uppercase<key & string>]:obj[key]
}

const p2:uppercaseKey<person> = {
    NAME:'zwf',
    AGE:18,
    SEX:true
}

/**
 * 对key进行操作，把所有的key添加readonly
 */

type toReadonly<obj extends Object> = {
    readonly [key in keyof obj]:obj[key]
}

const p3:toReadonly<person> = {
    name:'zwf',
    age:18,
    sex:true
}

/**
 * 对key进行操作，把所有的key设置为可选属性
 */

type toPartial<obj extends Object> = {
    [key in keyof obj]?:obj[key]
}

const p4:toPartial<person> = {}

/**
 * 对key进行操作，把所有的key去除readonly
 */
type toMutable<obj extends Object> = {
  -readonly [key in keyof obj]: obj[key];
};

/**
 * 对key进行操作，把所有的key设置为必选
 */
type toRequired<obj extends Object> = {
  [key in keyof obj]?: obj[key];
};

/**
 * 对key进行操作，可选的将某个属性名设置为readonly
 */

type OneToReadonly<obj extends Object,keyName extends string> = {
    readonly [key in keyof obj as key extends keyName?readonly key:key]:obj[key]
}

const p5:OneToReadonly<person,'name'> = {

}

/**
 * 根据索引值类型做过滤
 */

type filerValueType<obj extends Object,valueType extends any> = {
    [key in keyof obj as obj[key] extends valueType?key:never]:obj[key]
}

const p6:filerValueType<person,string> = {
    name:'zwf'
}