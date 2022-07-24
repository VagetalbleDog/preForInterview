type CamelCase<str extends string> = str extends `${infer left}_${infer right}${infer rest}` ? CamelCase<`${left}${Uppercase<right>}${rest}`> : str;
/**
 * 把一个对象的所有属性中有索引类型的都设置为readonly，深递归
 * @param object
 * @returns object
 */
type DeepReadonly<obj extends object> = {
  readonly //注意下，这里需要判断下
  [key in keyof obj]: obj[key] extends object ? (obj[key] extends Function ? obj[key] : DeepReadonly<obj[key]>) : obj[key];
};

interface likeZwf {
  name: string;
  height: number;
  weight: number;
  friend: {
    name: string;
  };
}

const zwf: DeepReadonly<likeZwf> = {
  name: "zwf",
  height: 180,
  weight: 140,
  friend: {
    name: "wh",
  },
};
/**
 * 把一个对象的所有属性键名转换为驼峰
 * @param object
 * @returns object
 */

interface like_zwf {
  person_name_first: string;
  person_sex_is_man: true;
  person_friend: {
    friend_name_first: string;
  };
}

type keyUnderlineToCamel<obj extends Object> = {
  [key in keyof obj as key extends string ? CamelCase<key> : key]: obj[key] extends object ? keyUnderlineToCamel<obj[key]> : obj[key];
};

const p: keyUnderlineToCamel<like_zwf> = {
  personFriend: {
    friendNameFirst: "",
  },
  personNameFirst: "",
  personSexIsMan:true
};
