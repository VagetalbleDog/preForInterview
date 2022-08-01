const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const template = require('@babel/template').default;
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
      if(path.node.isNew){
          return;
      }
      const calleeName = generate(path.node.callee).code
      if(targetCalleeName.includes(calleeName)){
          const {line,column} = path.node.loc.start;
          const newNode = template.expression(`${calleeName}('filename:${line},${column}')`)();
          newNode.isNew = true;

          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
      }
  },
});

const { code, map } = generate(ast);

fs.writeFileSync(`${sourceCodePath}/targetCode.js`, code);

console.log("done");
