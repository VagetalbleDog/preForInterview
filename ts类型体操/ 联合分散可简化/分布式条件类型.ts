//当类型参数为联合类型，并在条件类型左边直接引用 这个联合类型时，TS会把每一个元素都单独传入做类型运算，最后再合并成联合类型，这就叫分布式条件类型

type abc = "a" | "b" | "c";

type upperCaseA<str extends string> = str extends "a" ? Uppercase<str> : str;

const d: upperCaseA<abc> = "A";

/**
 * 对一个字符串联合类型做下划线转驼峰
 */
type strUnion = "abc_abc_abc" | "efg_efg_efg" | "hi_hi_hi";

type CamelUnion<str extends string> = CamelCase<str>;

const a: CamelUnion<strUnion> = "efgEfgEfg";

/**
 * 判断一个类型是不是联合类型
 */
//A extends A 触发分布式条件类型的条件，会把A联合类型中的每个类型依次传入，但b不会
type isUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

/**
 * 数组转联合类型
 */
type arrToUnion<arr extends unknown[]> = arr[number];

/**
 * BEM命名规范 block_element--modifier
 */
type bem<block extends string, element extends string, modifier extends string> = `${block}_${element}-${modifier}`;

type block = ["block1", "block2"];
type element = ["ele1", "ele2"];
type modifier = ["mod1", "mod2"];

const bemEnum: bem<arrToUnion<block>, arrToUnion<element>, arrToUnion<modifier>> = "block1_ele1-mod2";

/**
 * 全组合，希望传入 'A'|'B' 返回 'A'|'B'|'AB'|'BA'
 */
type Combinations<A extends string, B extends string> = `${A}` | `${B}` | `${A}${B}` | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A ? Combinations<A, AllCombinations<Exclude<B, A>>> : never;

const c:AllCombinations<'a'|'b'|'c'> = 'abc'