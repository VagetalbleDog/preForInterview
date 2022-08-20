# BFC
  - float不为none
  - position为absolute或者fixed
  - overflow 不为auto
  - display为flex、flow-root、table-cell等

# 层叠上下文

  - position为relative/absolute且 z-index 不为auto
  - position为fixed/sticky
  - html根元素
  - flex且z-index不为auto
  - opacity小于1
  - transform不为none