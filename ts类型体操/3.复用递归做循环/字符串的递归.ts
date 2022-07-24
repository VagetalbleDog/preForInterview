/**
 * 替换一个字符串中的所有特定的某字符
 * @param string,char
 * @returns string
 */

type replaceAll<str extends string, char extends string> = str extends `${infer prefix}${char}${infer suffix}`
  ? replaceAll<`${prefix}${suffix}`, char>
  : str;

type str1 = "zwf is not is not good";

const replaceStr1: replaceAll<str1, "not "> = "zwf is is good";

/**
 * 把一个字符串字面量的所有值提取出来做为联合类型
 * @param string
 * @returns typeUnion
 */
type stringToUnion<str extends string> = str extends `${infer first}${infer rest}` ? first | stringToUnion<rest> : never;

type str2 = "zwf";

const toUnionStr2: stringToUnion<str2> = "z";

/**
 * 把一个字符串翻转
 * @param string
 * @return string
 */

type ReverseStr<str extends string, Result extends string = ""> = str extends `${infer first}${infer rest}`
  ? ReverseStr<rest, `${first}${Result}`>
  : Result;

type str3 = 'abcdefg'

const reverseStr3:ReverseStr<str3> = 'gfedcba'