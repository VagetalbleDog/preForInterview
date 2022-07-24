//用模式匹配 判断某字符串是否以某字符串开头
type startWith<str extends string, prefix extends string> = str extends `${prefix}${string}` ? true : false;

//实现字符串替换
type replace<str extends string, target extends string, replace extends string | number> = str extends `${infer str1}${target}${infer str2}`
  ? `${str1}${replace}${str2}`
  : never;

//去除空白字符
type trim<str extends string> = str extends `${infer str1}${" "}${infer str2}` ? trim<`${str1}${str2}`> :str;

const u: startWith<"abcd", "abc"> = true;

const re:replace<"hello name","name","zwf"> = 'hello zwf'

const space:trim<'a   b   '> = 'ab'