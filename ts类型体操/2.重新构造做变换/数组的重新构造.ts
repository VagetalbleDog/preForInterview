/**
 * 声明一个元组类型，为他尾部加上一个新的类型
 */
type push<Arr extends unknown[], ele extends string | number | boolean> = [...Arr, ele];

type tuple1 = [1, 2, true, "str"];

const a: push<tuple1, number> = [1, 2, true, "str", 3];

/**
 * 声明一个元组类型，为他头部加上一个新的类型
 */
type unshift<arr extends unknown[], ele extends string | number | boolean> = [ele, ...arr];

type tuple2 = [string, number, number, boolean, undefined];

const b: unshift<tuple2, boolean> = [true, "", 1, 1, false, undefined];

/**
 * 将两个元组合并压缩 [number,string]和[boolean,number] => [[number,string],[boolean,number]]
 */
type zipTwo<T1 extends unknown[], T2 extends unknown[]> = [[...T1], [...T2]];

type tup1 = [string, number];
type tup2 = [number, string];

const c: zipTwo<tup1, tup2> = [
  ['', 1],
  [3, ""],
];
