# 第3章　基础数据类型

虽然从底层而言，所有的数据都是由比特组成，但计算机一般操作的是固定大小的字，如整数、浮点数、比特数组、内存地址等。进一步将这些数组织在一起，就可表达更多的对象，例如数据包、像素点、诗歌，甚至其他任何对象。Go语言提供了丰富的数据组织形式，这依赖于Go语言内置的数据类型。这些内置的数据类型，兼顾了硬件的特性和表达复杂数据结构的便捷性。

Go语言将数据类型分为四类：基础类型、复合类型、引用类型和接口类型。本章介绍基础类型，包括：数字、字符串和布尔型。复合数据类型——数组（§4.1）和结构体（§4.2）——是通过组合简单类型，来表达更加复杂的数据结构。引用类型包括指针（§2.3.2）、切片（§4.2)）、字典（§4.3）、函数（§5）、通道（§8），虽然数据种类很多，但它们都是对程序中一个变量或状态的间接引用。这意味着对任一引用类型数据的修改都会影响所有该引用的拷贝。我们将在第7章介绍接口类型。

## TypeScript 对照
- 数字类型：Go 拥有 `int/int64/uint64/float32/float64/complex` 等精确定义；TS 只有双精度 `number` 和 `bigint`。
- 文本：`string` 都是 UTF-8/UTF-16 代码点序列且不可变；Go 有 `rune`（UTF-8 代码点）与 `byte`，TS 常用 `string` 和 `Buffer/Uint8Array`。
- 布尔：Go `bool` 只能为 true/false，不可与数字互换；TS 亦如此但有 truthy 概念。
- 常量：Go `const` 编译期常量，`iota` 生成枚举值；TS `const enum` 或手写枚举近似。
- 类型转换：Go 不做隐式数值转换，`int` 与 `float64` 需显式转换；TS 允许更多隐式转换，需 ESLint 限制。

### 示例：rune/byte 与字符串
```go
package main

import "fmt"

func main() {
	s := "Go语言"
	fmt.Println(len(s))        // 8 (字节数)
	fmt.Println([]rune(s))     // [71 111 35821 35328]
	fmt.Println(string([]byte{71, 111})) // "Go"
}
```

```ts
const s = "Go语言";
console.log(s.length); // 4 (UTF-16 代码单元)
console.log([...s]);   // ["G","o","语","言"]
console.log(Buffer.from([71, 111]).toString()); // "Go"
```

### 踩坑提醒
- `len(string)` 返回字节数，非字符数；遍历多字节字符需用 `range` 得到 `rune`。
- 数值运算不会自动提升精度，`int` 与 `float` 混用需显式转换。
- `const` 只能绑定编译期可确定的值；运行期配置用 `var`/`const`+函数初始化。
