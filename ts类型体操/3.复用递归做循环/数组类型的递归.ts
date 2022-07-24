/**
 * Promise的嵌套取值
 */

type getDeepValueOfPromise<promise extends any> = promise extends Promise<
  infer valueType
>
  ? getDeepValueOfPromise<valueType>
  : promise

type deepPromise = Promise<Promise<Promise<Promise<Promise<string>>>>>

const str1: getDeepValueOfPromise<deepPromise> = ''

/**
 * 将一个数组倒过来
 */

type reverseArr<T extends unknown[]> = T extends [
  ...pre: infer preType,
  last: infer lastType
]
  ? [lastType, ...reverseArr<preType>]
  : T

type tuple = [number, boolean, string, number]

type t1 = reverseArr<tuple>

const arr: t1 = [1, '', true, 1]

/**
 * 某元素类型是否存在该数组内？
 */

type include<arr extends unknown[], element extends any> = arr extends [
  target: infer firstType,
  ...last: infer lastType
]
  ? firstType extends element
    ? true
    : include<lastType, element>
  : false

const FALSE: include<tuple, undefined> = false

/**
 * 删除第一个某类型元素
 */

type RemoveItem<
  arr extends unknown[],
  element extends any,
  Result extends unknown[]
> = arr extends [pre: infer preType, ...last: infer lastType]
  ? preType extends element
    ? RemoveItem<lastType, element, Result>
    : RemoveItem<lastType, element, [...Result, preType]>
  : Result

const arr3: RemoveItem<t1, boolean, []> = [1, '', 1]

/**
 * 传入一个元素类型，和一个数组长度，构造一个
 */
type BuildArr<
  length extends number,
  elementType extends any,
  arr extends unknown[] = []
> = arr['length'] extends length
  ? arr
  : BuildArr<length, elementType, [...arr, elementType]>

const fiveBoolean:BuildArr<5,boolean> = [true,false,false,true,false]