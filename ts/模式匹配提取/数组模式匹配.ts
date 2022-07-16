type arr = [number, boolean, string, undefined];

//取得一个promise对象的value类型
type ValOfP<P> = P extends Promise<infer value> ? value : never;

//取得一个数组类型的第一个元素的类型
type FirstOfArr<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

//取得一个数组类型的第一个元素的类型
type LastOfArr<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

//取得一个数组类型pop掉最后一个元素后，剩余数组的类型
type popArr<Arr extends unknown[]> = Arr extends [...infer rest, infer Last]
  ? rest
  : never;

//取得一个数组类型shift掉第一个元素后，剩余数组的类型
type shiftArr<Arr extends unknown[]> = Arr extends [infer first, ...infer rest]
  ? rest
  : never;

//取得一个数组类型unshift进一个元素之后数组的类型
type unshiftArr<Arr extends unknown[], T> = Arr;

const n1: FirstOfArr<arr> = 1;

const nl: LastOfArr<arr> = undefined;

const res: popArr<arr> = [1, true, ""];

const res1: shiftArr<arr> = [true, "", undefined];
