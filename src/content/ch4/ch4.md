# 第4章　复合数据类型

在第三章我们讨论了基本数据类型，它们可以用于构建程序中数据的结构，是Go语言世界的原子。在本章，我们将讨论复合数据类型，它是以不同的方式组合基本类型而构造出来的复合数据类型。我们主要讨论四种类型——数组、slice、map和结构体——同时在本章的最后，我们将演示如何使用结构体来解码和编码到对应JSON格式的数据，并且通过结合使用模板来生成HTML页面。

数组和结构体是聚合类型；它们的值由许多元素或成员字段的值组成。数组是由同构的元素组成——每个数组元素都是完全相同的类型——结构体则是由异构的元素组成的。数组和结构体都是有固定内存大小的数据结构。相比之下，slice和map则是动态的数据结构，它们将根据需要动态增长。

## TypeScript 对照
- Go 数组长度是类型组成的一部分，接近 TS tuple/ReadonlyArray；日常多用 slice，类似带容量信息的视图。
- Slice 共享底层数组，`append` 可能扩容；TS `array.slice()` 返回拷贝，不会影响原数组。
- `map[string]int` 类似 TS `Record<string, number>` 或 `Map<string, number>`，但零值为 `nil`，需初始化后才能写入。
- `struct` 是具体内存布局，类似 TS 接口的“形状”+字段定义；导出字段需首字母大写，JSON 编解码依赖 tag。
- JSON：Go 依赖字段 tag `json:"name"` 控制序列化，TS 多用 `JSON.stringify` 或类库（class-transformer/zod）做映射。

### 示例：Slice 与数组视图
```go
package main

import "fmt"

func main() {
	nums := [...]int{1, 2, 3, 4}
	sub := nums[1:3] // [2 3] 共享底层
	sub[0] = 20
	fmt.Println(nums) // [1 20 3 4]
}
```

```ts
const nums = [1, 2, 3, 4];
const sub = nums.slice(1, 3); // 拷贝，不共享
sub[0] = 20;
console.log(nums); // [1, 2, 3, 4]
```

### 踩坑提醒
- 未初始化的 map 为 nil，写入会 panic；需 `make(map[string]int)`。
- Slice 改动可能影响其他引用同一底层数组的切片，注意并发下的竞态。
- JSON 序列化仅导出字段会被处理（首字母大写），缺少 tag 会得到默认字段名。

