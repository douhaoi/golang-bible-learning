# 第7章　接口

接口类型表达的是对其他类型行为的一种泛化或抽象。通过泛化，接口使我们能够编写更灵活、更适应变化的函数，因为它们不依赖于某个特定实现的细节。

许多面向对象的语言都有“接口”这一概念，但 Go 的接口之所以独特，是因为它们是隐式满足的。换句话说，一个具体类型不需要显式声明它实现了哪些接口；只要它拥有接口所需的方法，就自动被认为满足了该接口。这种设计让你可以为已有的具体类型创建新的接口，而不需要修改这些类型本身——这在处理你无法控制的外部包中定义的类型时特别有用

在本章，我们会开始看到接口类型和值的一些基本技巧。顺着这种方式我们将学习几个来自标准库的重要接口。很多Go程序中都尽可能多的去使用标准库中的接口。最后，我们会在（§7.10）看到类型断言的知识，在（§7.13）看到类型开关的使用并且学到他们是怎样让不同的类型的概括成为可能。

## TypeScript 对照
- 结构化类型系统：Go 接口与 TS 接口都基于“形状”，无需显式 `implements`（Go 更彻底，纯隐式）。
- 接口值为 `(type, value)` 二元组，零值为 `nil`；TS 的 `undefined` 仅代表缺失，没有承载动态类型信息。
- 类型断言：`v.(T)` 类似 TS `value as T`，失败会 panic，可用 `v, ok :=` 获取布尔结果；TS 需自定义类型守卫。
- 类型开关：`switch x := v.(type) {}` 类似 TS `switch (typeof v)` + 用户定义守卫，用于多类型分支。

### 示例：隐式实现与类型断言
```go
package main

import "fmt"

type Greeter interface {
	Greet() string
}

type User struct{ Name string }

func (u User) Greet() string { return "Hi, " + u.Name }

func printGreet(g Greeter) {
	if u, ok := g.(User); ok {
		fmt.Println("as user:", u.Name)
	}
	fmt.Println(g.Greet())
}

func main() {
	printGreet(User{Name: "Go"})
}
```

```ts
interface Greeter {
  greet(): string;
}

class User implements Greeter {
  constructor(public name: string) {}
  greet() {
    return `Hi, ${this.name}`;
  }
}

function printGreet(g: Greeter) {
  if (g instanceof User) {
    console.log("as user:", g.name);
  }
  console.log(g.greet());
}

printGreet(new User("TS"));
```

### 踩坑提醒
- `var g Greeter` 初始为 `nil`，直接调用方法会 panic；创建时用具体值填充。
- `interface{} == nil` 仅在类型和值都为 nil 时才为真，`var w io.Writer = (*bytes.Buffer)(nil)` 不等于 `nil`。
- 指针接收者/值接收者决定是否满足接口，方法集差异会影响实现匹配。
