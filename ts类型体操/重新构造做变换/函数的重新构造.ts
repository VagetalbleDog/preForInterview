/**
 * 增加参数类型
 */

type addArgument<func extends Function, arg extends any> = func extends (...args: infer argTypes) => any
  ? (...arg: [...argTypes, arg]) => any
  : never;

type func1 = (string: string, number: number) => any;

const addFunc1: addArgument<func1, boolean> = (name: string, age: number, isMale: boolean) => {};

/**
 * 修改第一个参数的类型
 */

type updateFirstArgType<func extends Function,argType> = func extends (first:any,...rest:infer restType)=>any ? (first:argType,...rest:restType)=>any:never;

type func2 = (arg_1:string,arg_2:boolean,arg_3:number)=>any;

const updateFunc2: updateFirstArgType<func2, boolean> = (name: boolean, age: boolean, isMale: number) => {};