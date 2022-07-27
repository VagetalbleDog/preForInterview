const parser = require('@babel/parser')
const sourceCode = `
    let name:string;

    name = 111;
`

//使用 babel parser 来 parse，启用 typescript 语法插件。
const AST = parser.parse(sourceCode,{plugins:['typescript']})

const [sentence1,sentence2] = AST.program.body;

console.log(sentence1.declarations[0].id.typeAnnotation.typeAnnotation.type); //输出TSStringKeyword，代表name的类型

console.log(sentence2.expression.right.type)  //输出NumericLiteral，代表数字字面量，不是字符串字面量，说明类型检查出错。


