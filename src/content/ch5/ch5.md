# 第5章　函数

函数可以让我们将一个语句序列打包为一个单元，然后可以从程序中其它地方多次调用。函数的机制可以让我们将一个大的工作分解为小的任务，这样的小任务可以让不同程序员在不同时间、不同地方独立完成。一个函数同时对用户隐藏了其实现细节。由于这些因素，对于任何编程语言来说，函数都是一个至关重要的部分。

我们已经见过许多函数了。现在，让我们多花一点时间来彻底地讨论函数特性。本章的运行示例是一个网络蜘蛛，也就是web搜索引擎中负责抓取网页部分的组件，它们根据抓取网页中的链接继续抓取链接指向的页面。一个网络蜘蛛的例子给我们足够的机会去探索递归函数、匿名函数、错误处理和函数其它的很多特性。

## TypeScript 对照
- 多返回值：Go 原生支持 `(T, error)`，TS 常用返回对象或元组解构。
- 错误处理：Go 倾向显式返回错误；TS/JS 习惯 `try/catch` 或 `Result` 模式。
- 匿名函数/闭包：语义与 TS 类似，但在 goroutine 并发中闭包捕获变量需注意。
- `defer`：结束前执行的清理，相当于 TS 的 `finally`，但按 LIFO 顺序延后执行。
- 可变参数：`func sum(nums ...int)` 类似 TS `function sum(...nums: number[])`。

### 示例：多返回值与 defer
```go
package main

import (
	"errors"
	"fmt"
)

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("divide by zero")
	}
	return a / b, nil
}

func main() {
	defer fmt.Println("done") // 最后执行
	if v, err := divide(6, 3); err == nil {
		fmt.Println("result:", v)
	}
}
```

```ts
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("divide by zero");
  return a / b;
}

try {
  const v = divide(6, 3);
  console.log("result:", v);
} finally {
  console.log("done");
}
```

### 踩坑提醒
- 未使用的返回值（尤其是错误）会导致静态分析警告，习惯接收并处理 `err`。
- `defer` 在函数返回前执行，不适合高频短路径内的微优化场景。
- 闭包捕获循环变量，在并发场景需用局部拷贝，否则值被后续迭代覆盖。

