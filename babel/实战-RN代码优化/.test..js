const babelRnUnpackingPlugin = require('./babel-plugin-rn-unpacking');
const fs = require('fs');
const path = require('path');
const {transformSync} = require('@babel/core')

const sourceCode = fs.readFileSync(path.join(__dirname,'./sourceCode.js'),{encoding:'utf-8'})

const {code} = transformSync(sourceCode,{
    plugins:[babelRnUnpackingPlugin],
    parserOpts:{
        sourceType:'unambiguous',
        plugins:['jsx']
    }
})
console.log(code)