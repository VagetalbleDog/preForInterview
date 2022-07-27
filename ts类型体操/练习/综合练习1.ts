/**
 * 中划线转驼峰
 */
declare type kebabCaseToCamelCase<str extends string> = str extends `${infer pre}-${infer last}`
  ? kebabCaseToCamelCase<`${pre}${Capitalize<last>}`>
  : str;

const a = "aaa-bbb-ccc-ddd";

const b: kebabCaseToCamelCase<typeof a> = "aaaBbbCccDdd";

/**
 * chunk 对数组做分组 每x个一组 x=2:【1，2，3，4，5】=>【【1，2】，【3，4】，【5】】
 */

declare type chunk<arr extends unknown[], groupLength extends number, curItem extends unknown[] = [], result extends unknown[] = []> = arr extends [
  first: infer first,
  ...rest: infer rest
]
  ? curItem["length"] extends groupLength
    ? chunk<rest, groupLength, [first], [...result, curItem]>
    : chunk<rest, groupLength, [...curItem, first], result>
  : [...result,curItem];

type c = [1,2,3,4,5];

const d:chunk<c,2> = [[1,2],[3,4],[5]]

