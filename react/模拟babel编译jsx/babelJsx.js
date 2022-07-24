const fs = require('fs')
const babel = require('@babel/core')
fs.readFile('./element.js',(e,data)=>{
    const code = data.toString('utf-8')
    const result = babel.transformSync(code,{
        Plugin:['@babel/plugin-transform-react-jsx']
    });
    fs.writeFile('./element.js',result.code,()=>{})
})