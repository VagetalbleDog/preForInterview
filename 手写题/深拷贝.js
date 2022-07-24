//方法1、使用Json的stringify和parse方法
function deepClone_JsonType(obj) {
  let temp = JSON.stringify(obj)
  return JSON.parse(temp)
}

//方法2 递归
const deepCopy = (obj)=>{
  if(typeof obj!=='object'){
    return;
  }
  const map = new Map();
  const deep = (obj)=>{
    const newObj = Array.isArray(obj)?[]:{};
    map.set(obj,newObj)
    for(const key in obj){
      if(obj.hasOwnProperty(key)){
        newObj[key]=typeof obj[key]==='object'?deep(obj[key]):obj[key]
      }
    }
    return newObj
  }
  return deep(obj)
}
//测试
let obj1 = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3, { e: { f: 5 } }],
}
let obj2 = deepCopy(obj1)
obj2.d[3].e.f=6
console.log(obj2)
console.log(obj2.d[3].e.f)
