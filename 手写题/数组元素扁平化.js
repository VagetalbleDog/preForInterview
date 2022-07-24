let arr = [1, [2, [3, [4, 5]]]]
//方法一、递归
const flatten = (arr)=>{
  if(!Array.isArray(arr)){
    return;
  }
  let resArr = [];
  for(let key of arr){
    if(Array.isArray(key)){
      resArr = resArr.concat(flatten(key))
    }else{
      resArr.push(key)
    }
  }
  return resArr;
}

const flatten2 = (arr)=>{
  return arr.toString().split(',').map(i=>Number(i))
}
console.log(flatten2(arr))