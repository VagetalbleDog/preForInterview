# babel 插件单元测试的方式
babel 插件做的事情就是对 AST 做转换，那么我们很容易可以想到几种测试的方式：

  - 测试转换后的 AST，是否符合预期 
  - 测试转换后生成的代码，是否符合预期（如果代码比较多，可以存成快照，进行快照对比）
  - 转换后的代码执行一下，测试是否符合预期

# babel-plugin-tester
babel-plugin-tester 就是对比生成的代码的方式来实现的。

可以直接对比输入输出的字符串，也可以对比文件，还可以对比快照：
```
import pluginTester from 'babel-plugin-tester';
import xxxPlugin from '../xxx-plugin';

pluginTester({
  plugin: xxxPlugin,
  fixtures: path.join(__dirname, '__fixtures__'), // 保存测试点的地方
  tests: {
    'case1:xxxxxx': '"hello";', // 输入输出都是同个字符串
    'case2:xxxxxx': { // 指定输入输出的字符串
      code: 'var hello = "hi";',
      output: 'var olleh = "hi";',
    },
    'case3:xxxxxx': { // 指定输入输出的文件，和真实输出对比
      fixture: 'changed.js',
      outputFixture: 'changed-output.js',
    },
    'case4:xxxxxx': { // 指定输入字符串，输出到快照文件中，对比测试
      code: `
        function sayHi(person) {
          return 'Hello ' + person + '!'
        }
      `,
      snapshot: true,
    },
  },
});
```
这三种方式本质上都一样，但是根据情况，如果比较少的内容可以直接对比字符串，内容比较多的时候可以使用快照测试，或者指定输出内容，然后对比测试。