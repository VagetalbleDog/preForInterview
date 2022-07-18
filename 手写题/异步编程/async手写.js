function generatorToAsync(generator){
    return function(){
        const gen = generator().apply(this,arguments);//gen有可能传参
        return new Promise((resolve,reject)=>{
            function go(key,arg){
                let res;
                
            }
        })
    }
}