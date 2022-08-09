# 什么是WeakSet 
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有三个区别。

  - WeakSet 的成员只能是对象，而不能是其他类型的值，而且存入的也是引用值

  - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
  
  - weakSet 不可遍历，也不能使用size等方法，只有 has、add、delete 方法

# 什么是WeakMap

WeakMap与Map的区别有三点。

  - 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
  - WeakMap的键名所指向的对象，不计入垃圾回收机制。注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
  - 不支持遍历，size、entire、key、values等，只有has、get、set、delete

# WeakSet和WeakMap设计的初衷

垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。

