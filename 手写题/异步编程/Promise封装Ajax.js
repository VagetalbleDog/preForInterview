const first = new Promise((resolve,reject)=>{
    setTimeout(resolve,500,'第一个');
})
const second = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,'第二个');
    throw new Error('第二个出错了，你们都别跑了')
})

Promise.race([first,second]).then(val=>{
    console.log(val);
}).catch(err=>{
    console.log(err)
})