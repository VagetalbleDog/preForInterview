const {transformSync} = require('@babel/core');
const path = require('path');
const fs = require('fs')
const sourceCodePath = path.join(__dirname);
const insertPlugin = require(`${sourceCodePath}/insertBabelPlugin.js`)

const sourceCode = fs.readFileSync(`${sourceCodePath}/sourceCode.js`).toString();

const {code} = transformSync(sourceCode,{
    plugins:[insertPlugin],
    parserOpts:{
        sourceType:'unambiguous',
        plugins:['jsx']
    }
});

fs.writeFileSync(`${sourceCodePath}/targetCode.js`, code);

console.log("done");