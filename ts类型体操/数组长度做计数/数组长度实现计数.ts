/**
 * 获取一个字符串的长度
 */
type strLen<str extends string, arr extends unknown[] = []> = str extends `${infer first}${infer rest}`
  ? strLen<rest, [first, ...arr]>
  : arr["length"];

const fourteen: strLen<"abcdefgabcdefg"> = 14;

/**
 * 比较两个数字的大小
 */

type greaterThan<num1 extends number, num2 extends number, arr extends unknown[] = []> = num1 extends num2
  ? false
  : arr["length"] extends num2
  ? true
  : arr["length"] extends num1
  ? false
  : greaterThan<num1, num2, [unknown, ...arr]>;

const TRUE: greaterThan<8, 5> = true;

/**
 * 比较两个字符串的长度
 */

type longerThan<str1 extends string, str2 extends string> = greaterThan<strLen<str1>, strLen<str2>>;

const FALSE: longerThan<"abcdefg", "abcdefgh"> = false;

/**
 * 实现fibonacci数列
 */
//其实就是用数组代表数字，通过["length"]输出结果
type fibonacciLoop<pre extends unknown[], current extends unknown[], index extends unknown[], num extends number> = index["length"] extends num
  ? current["length"]
  : fibonacciLoop<current, [...pre, ...current], [...index, unknown], num>;

type fibonacci<num extends number> = fibonacciLoop<[1], [], [], num>;

const fibTen: fibonacci<10> = 55;
