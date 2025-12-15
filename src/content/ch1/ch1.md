# 第1章　入门

本章介绍Go语言的基础组件。本章提供了足够的信息和示例程序，希望可以帮你尽快入门，写出有用的程序。本章和之后章节的示例程序都针对你可能遇到的现实案例。先了解几个Go程序，涉及的主题从简单的文件处理、图像处理到互联网客户端和服务端并发。当然，第一章不会解释细枝末节，但用这些程序来学习一门新语言还是很有效的。

学习一门新语言时，会有一种自然的倾向，按照自己熟悉的语言的套路写新语言程序。学习Go语言的过程中，请警惕这种想法，尽量别这么做。我们会演示怎么写好Go语言程序，所以，请使用本书的代码作为你自己写程序时的指南。

## TypeScript 对照
- 运行方式：`go run main.go` 一步编译+运行，可类比 `ts-node main.ts`；`go build` 产出独立二进制，TS/Node 需要 `node dist/main.js`。
- 包入口：`package main` + `func main()` 对应 Node 单文件脚本的顶层执行；标准库 `fmt.Println` 相当于 `console.log`，但类型检查更严格。
- 依赖导入：Go `import "fmt"` 只能导入包；TS 支持相对/别名路径，Go 依赖通过模块路径解析。
- 并发示例：章节后面的多路抓取用 goroutine/channel；TS 里习惯用 `Promise.all`，但 goroutine 不是 Promise，调度和内存模型不同。

### 示例：Hello World 对照
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go")
}
```

```ts
// main.ts
console.log("Hello, TypeScript");
```

### 踩坑提醒
- Go 的导入必须使用到；未使用的包/变量会直接编译失败（TS/ESLint 多为警告）。
- Go 的分号由编译器插入，`{` 不能单独换行；直接复制 TS 习惯可能触发语法错误。
- `go build` 产出的二进制与平台相关，不像 TS/JS 依赖运行时。
