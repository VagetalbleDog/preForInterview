type removeAnd<query extends string, result extends string[] = []> = query extends `${infer pre}&${infer suffix}`
  ? removeAnd<suffix, [...result, pre]>
  : [...result, query];

const arr: removeAnd<"a=1&b=2&c=3"> = ["a=1", "b=2", "c=3"];

type queryToObj<str extends string | any> = str extends `${infer key}=${infer value}` ? { [k in key]: value } : {};

const a: queryToObj<"a=1"> = {
  a: "1",
};
type mergeObjArr<arr extends unknown[], result extends Record<string, any> = {}> = arr["length"] extends 0
  ? result
  : arr extends [first: infer first, ...rest: infer rest]
  ? mergeObjArr<rest, result & queryToObj<first>>
  : never;

const Obj: mergeObjArr<typeof arr> = {
  a: "1",
  b: "2",
  c: "3",
};

declare type ParseQueryString<str extends string> = mergeObjArr<removeAnd<str>>;

const test: ParseQueryString<"a=1&b=2&c=3"> = {
  a: "1",
  b: "2",
  c: "3",
};

