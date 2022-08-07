const CompatibleCode = "__MUSIC_INJECT_CONTEXT__";

const babelRnUnpackingPlugin = ({ types, template }) => {
  return {
    visitor: {
      // 先判断下文件名，不是要处理的文件直接stop
      Program(path, state) {
        const filename = state.file.opts.filename
        if(!/.ios.biz.js$/.test(filename)){
          path.stop();
        }
      },
      "ArrowFunctionExpression|FunctionExpression"(path, state) {
        //没有函数名，return
        if (!path.parent.id) {
          return;
        }
        //获取函数名
        const funcName = path.parent.id.name;

        if (funcName !== "App") {
          return;
        }
        //获取函数体
        const funcBody = path.node.body.body;
        //没有props？
        if (!path.node.params.find((param) => param.name === "props")) {
          //插入props参数
          path.node.params.push(types.identifier("props"));
        }
        //从props参数中取变量
        path.node.body.body.unshift(template.ast(`window.${CompatibleCode} = props`));
      },
      MemberExpression(path, state) {
        //处理完的节点直接return
        if (path.node.isNew) {
          return;
        }

        const name = path.get("object").node.name;
        if (name === "NERCTAppContextModule" || name === "NMRCTAppContextModule") {
          //已经做了处理直接return
          if (path.parent.operator === "||" && path.parent.right.object.name === CompatibleCode) {
            return;
          }
          //没做处理，替换节点
          const value = path.get("property").node.name;
          const newNode = template.ast(`${name}.${value} || ${CompatibleCode}.${value}`);
          //加标记
          newNode.isNew = true;
          path.replaceWith(newNode);
          path.node.left.isNew = true;
        }
      },
    },
  };
};

module.exports = babelRnUnpackingPlugin;
