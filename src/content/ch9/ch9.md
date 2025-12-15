# 第9章　基于共享变量的并发

前一章我们介绍了一些使用goroutine和channel这样直接而自然的方式来实现并发的方法。然而这样做我们实际上回避了在写并发代码时必须处理的一些重要而且细微的问题。

在本章中，我们会细致地了解并发机制。尤其是在多goroutine之间的共享变量，并发问题的分析手段，以及解决这些问题的基本模式。最后我们会解释goroutine和操作系统线程之间的技术上的一些区别。

## TypeScript 对照
- 锁与同步：Go 需显式 `sync.Mutex/RWMutex` 保护共享状态；TS/JS 通常依赖事件循环的单线程模型，无真实锁。
- 原子操作：`sync/atomic` 提供无锁计数/状态切换，TS 中可用 `Atomics` 针对 `SharedArrayBuffer`，但应用场景较少。
- 只执行一次：`sync.Once` 提供线程安全的惰性初始化，类似 TS 中手写的单例守卫。
- 竞态检测：`go test -race` 可发现数据竞争；TS 缺少运行时检测，更多依赖设计与测试。

### 示例：互斥保护计数
```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var (
		mu  sync.Mutex
		sum int
		wg  sync.WaitGroup
	)
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			sum++
			mu.Unlock()
		}()
	}
	wg.Wait()
	fmt.Println("sum:", sum)
}
```

```ts
let sum = 0;
async function add() {
  // JS 单线程无需锁，但在 WebWorker/Atomics 场景则需 SharedArrayBuffer + Atomics
  sum++;
}

await Promise.all([add(), add(), add()]);
console.log("sum:", sum);
```

### 踩坑提醒
- 未加锁读取/写入共享变量会触发数据竞争，`go test -race` 可帮助发现。
- 加锁后务必 `defer mu.Unlock()` 或在所有路径显式释放，避免死锁。
- `sync.Once` 不可重置，适合全局单例初始化，误用会导致配置变更失效。
