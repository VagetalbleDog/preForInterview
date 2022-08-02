const importModule = require('@babel/helper-module-imports');
const {declare} = require('@babel/helper-plugin-utils');

const autoTrackPlugin = declare((api,options,dirname)=>{
    api.assertVersion(7);

    return {
      visitor: {
        Program: {
          enter(path, state) {
            path.traverse({
              ImportDeclaration(curPath) {
                const source = curPath.get("source").node.value;
                if (source === "tracker") {
                  state.find = true;
                  path.stop();
                }
              },
            });
            if (!state.find) {
              state.trackerImportId = importModule.addDefault(path, "tracker", { nameHint: path.scope.generateUid("tracker") }).name;
              state.trackerAST = api.template.statement(`${state.trackerImportId}()`)()
            }
          },
        },
        "ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration"(path, state) {
          const bodyPath = path.get("body");
          if (bodyPath.isBlockStatement()) {
            bodyPath.node.body.unshift(state.trackerAST);
          }
        },
      },
    };
})

module.exports = autoTrackPlugin;