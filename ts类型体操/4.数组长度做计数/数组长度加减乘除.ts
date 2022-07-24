//可以通过length获取一个数组的长度
type num2 = [string, unknown, any]["length"];

/**
 * 给一个数组长度，递归构造一个这么长的数组
 */

type buildArr<length extends number, ele extends unknown, result extends unknown[] = []> = result["length"] extends length
  ? result
  : buildArr<length, ele, [ele, ...result]>;

const s: buildArr<5, string> = ["", "", "", "", ""];
/**
 * 使用数组长度实现加法
 */
type Add<num1 extends number, num2 extends number> = [...buildArr<num1, unknown>, ...buildArr<num2, unknown>]["length"];

const twenty: Add<10, 10> = 20;

/**
 * 使用提取数组类型实现减法
 */

type Subtract<num1 extends number, num2 extends number> = buildArr<num1, unknown> extends [...arr1: buildArr<num2, unknown>, ...arr2: infer Rest]
  ? Rest["length"]
  : never;

const fifteen: Subtract<35, 20> = 15;

/**
 * 使用递归调用加法实现乘法
 */

type multiple<num1 extends number, num2 extends number, resultArr extends unknown[] = []> = num2 extends 0
  ? resultArr["length"]
  : multiple<num1, Subtract<num2, 1>, [...buildArr<num1, unknown>, ...resultArr]>;

const forty: multiple<5, 8> = 40;

/**
 * 使用递归调用减法实现除法
 */
type Divide<num1 extends number, num2 extends number, result extends unknown[] = []> = num1 extends 0
  ? result["length"]
  : Divide<Subtract<num1, num2>, num2, [unknown, ...result]>;
const eight:Divide<64,8> = 8;