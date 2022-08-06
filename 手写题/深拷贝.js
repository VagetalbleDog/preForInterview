//方法1、使用Json的stringify和parse方法
function deepClone_JsonType(obj) {
  let temp = JSON.stringify(obj)
  return JSON.parse(temp)
}

//方法2 递归
const deepCopy = (obj)=>{
  const hash = new Map();

  const deep = (obj)=>{
    if(hash.get(obj)){
      return hash.get(obj)
    }
    const newObj = Array.isArray(obj)?[]:{};
    hash.set(obj,newObj)
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        if(typeof obj[key]!=='object'){
          newObj[key] = obj[key]
        }else{
          newObj[key] = deep(obj[key])
        }
      }
    }
    return newObj;
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
