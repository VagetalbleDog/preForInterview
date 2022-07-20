/**
 * 把一个对象的所有属性中有索引类型的都设置为readonly，深递归
 * @param object
 * @returns object
 */
type DeepReadonly<obj extends object> = {
    //注意下，这里需要判断下
  readonly [key in keyof obj]: obj[key] extends object ? (obj[key] extends Function ? obj[key] : DeepReadonly<obj[key]>) : obj[key];
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
