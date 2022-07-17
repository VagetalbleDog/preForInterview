//提取函数参数的类型
type getParmType<func extends Function> = func extends (...args:infer types)=>{} ?types:never;

//提取函数返回值的类型
type getReturnType<func extends Function> = func extends (...args:any[])=>infer type?type:never;

const a:getParmType<(a:string,b:boolean,c:number)=>{}> = [',',true,1]

const b:getReturnType<(a:string,b:boolean,c:number)=>string> = ''