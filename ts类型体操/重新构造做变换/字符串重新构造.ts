/**
 * 将字符串的字面量全部转换成首字母大写
 */
type CapitalizeStr<str extends string> = str extends `${infer first}${infer Rest}`? `${Uppercase<first>}${Rest}`:never;

type str1 = 'zhuwenfu'

const capStr1:CapitalizeStr<str1> = 'Zhuwenfu'

/**
 * 将字符串由下划线 转换成 驼峰 
 */

type CamelCase<str extends string> = str extends `${infer prefix}_${infer suffix}`
  ? CamelCase<`${prefix}${CapitalizeStr<suffix>}`>
  : str;

type str2 ='zhu_wen_fu'

const camelStr2:CamelCase<str2> = 'zhuWenFu'

/**
 * 删除子串
 */

type dropSubStr<mainStr extends string,subStr extends string> = mainStr extends `${infer prefix}${subStr}${infer suffix}`?`${prefix}${suffix}`:mainStr;

type str3 = 'zhuwenfu is a shuaige'

const dropStr3:dropSubStr<str3,'zhuwenfu'> = ' is a shuaige'
