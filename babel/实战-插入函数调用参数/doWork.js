const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");

const fs = require("fs");
const path = require("path");

const sourceCodePath = path.join(__dirname);

const sourceCode = fs.readFileSync(`${sourceCodePath}/sourceCode.js`).toString();

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

const targetCalleeName = ["log", "debug", "error", "info"].map((item) => `console.${item}`);

traverse(ast, {
  CallExpression(path, state) {
    //将节点转换成字符串再判断
    const calleeName = generate(path.node.callee).code;

    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(types.stringLiteral(`filename:(${line},${column})`));
    }
  },
});

const { code, map } = generate(ast);

fs.writeFileSync(`${sourceCodePath}/targetCode.js`, code);

console.log("done");
