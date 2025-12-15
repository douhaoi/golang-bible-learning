# 第8章　Goroutines和Channels

并发程序指同时进行多个任务的程序，随着硬件的发展，并发程序变得越来越重要。Web服务器会一次处理成千上万的请求。平板电脑和手机app在渲染用户画面同时还会后台执行各种计算任务和网络请求。即使是传统的批处理问题——读取数据、计算、写输出，现在也会用并发来隐藏掉I/O的操作延迟以充分利用现代计算机设备的多个核心。计算机的性能每年都在以非线性的速度增长。

Go语言中的并发程序可以用两种手段来实现。本章讲解goroutine和channel，其支持“顺序通信进程”（communicating sequential processes）或被简称为CSP。CSP是一种现代的并发编程模型，在这种编程模型中值会在不同的运行实例（goroutine）中传递，尽管大多数情况下仍然是被限制在单一实例中。第9章覆盖更为传统的并发模型：多线程共享内存，如果你在其它的主流语言中写过并发程序的话可能会更熟悉一些。第9章也会深入介绍一些并发程序带来的风险和陷阱。

尽管Go对并发的支持是众多强力特性之一，但跟踪调试并发程序还是很困难，在线性程序中形成的直觉往往还会使我们误入歧途。如果这是读者第一次接触并发，推荐稍微多花一些时间来思考这两个章节中的样例。

## TypeScript 对照
- goroutine：轻量线程，`go f()` 立即异步执行，不返回 Promise；TS 中常见的 `async/await` 只是协作式调度。
- channel：类型安全的通信管道，类似带阻塞语义的队列或 `AsyncIterator`；可缓冲或无缓冲。
- `select`：在多个 channel 操作间做就绪选择，类似 `Promise.race`，但可同时等待发送/接收。
- 取消与超时：`context.WithCancel/Timeout` 类似 TS `AbortController`；在 goroutine 内需主动检查。

### 示例：并发工作池对照
```go
package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, done chan<- int) {
	for j := range jobs {
		time.Sleep(10 * time.Millisecond)
		done <- id
		fmt.Println("job", j, "by", id)
	}
}

func main() {
	jobs := make(chan int, 3)
	done := make(chan int)
	for i := 0; i < 2; i++ {
		go worker(i, jobs, done)
	}
	for j := 0; j < 3; j++ {
		jobs <- j
	}
	close(jobs)
	for k := 0; k < 3; k++ {
		<-done
	}
}
```

```ts
const worker = async (id: number, job: number) => {
  await new Promise((r) => setTimeout(r, 10));
  console.log("job", job, "by", id);
};

async function main() {
  const jobs = [0, 1, 2];
  await Promise.all(
    jobs.map((job, idx) => worker(idx % 2, job))
  );
}

main();
```

### 踩坑提醒
- goroutine 不会自动收集结果，需用 channel/WaitGroup 协调；否则主程序提前退出。
- 无缓冲 channel 的发送/接收都会阻塞，需配合 goroutine 或缓冲避免死锁。
- goroutine 共享内存需要同步（锁/channel）；直接沿用 JS “单线程无锁”直觉会引入竞态。
