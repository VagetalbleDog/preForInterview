# Babel的API

babel的编译流程分为三步，parse、transform、generate，每一步都暴露了一些API

  - parse阶段有@babel/parse 把源码改成AST

  - transform阶段有@babel/traverse 遍历AST调用 visitor函数修改AST  
    涉及AST的判断、创建、修改等，这时候就需要@babel/types了，批量创建 AST的时候，使用@babel/template
  
  - generate阶段会把AST打印成目标代码，并生成sourcemap，这里需要@babel/generator
  
  