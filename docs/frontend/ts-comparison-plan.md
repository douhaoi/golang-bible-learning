# 前端 TypeScript 对照学习规划

## 目标
- 降低前端/TypeScript 开发者学习 Go 的门槛，用熟悉的心智模型对照讲解。
- 在每章正文中加入「TypeScript 对照」小节：列出概念映射、差异提醒、最小可运行示例。
- 先覆盖最常被前端问到的主题（类型、错误、并发、接口），再逐章补齐。

## 工作流
- 建立模版：统一「概念对照 + 示例 + 踩坑提醒」结构，便于作者快速追加。
- 逐章补充：按下方章节规划，从第 1~5、7、8、11 章优先落地，再扩展其他章节。
- 代码验证：示例保持最小可运行，Go 代码可用 `go run`，TS 代码用 `ts-node` 或在线 Playground 思路描述。
- 术语一致：保持 Go 官方译法，并给出对应的 TS 关键词/类比。

## 输出格式建议
- 标题：`TypeScript 对照`
- 结构：概念对照（列表） → 示例（Go 与 TS 并排或分段） → 踩坑提醒（最多 3 条）
- 示例粒度：围绕本节主概念的 5~15 行可运行片段，突出差异点。

## 章节规划（Go → TypeScript 类比切入点）
- 第 1 章 入门：`package main` 对比 TS/Node 单文件脚本；`fmt.Println` vs `console.log`；`flag` 解析参数 vs `process.argv/yargs`；`net/http` 获取 URL vs `fetch/axios`；并发抓取 URL 对比 `Promise.all`（强调 goroutine 不是 Promise）。
- 第 2 章 程序结构：显式类型 vs TS 类型推断；短变量声明 `:=` vs `let/const`；`type` 新类型 vs TS `type` alias/`interface`（强调 Go `type` 可定义新底层类型）；包作用域和导出规则（首字母大写） vs TS `export/import`；作用域与生命周期对比。
- 第 3 章 基础数据：Go 数值类型分级 vs TS `number` 的单一双精度；`rune`/`byte` vs TS `string`/`Uint8Array`；字符串不可变同 TS；`const` 编译期 vs TS `const` 运行期；iota 类似 enum 值生成。
- 第 4 章 复合数据：数组长度固定 vs TS tuple/ReadonlyArray；Slice 视图 vs TS `array.slice` 返回拷贝（强调共享底层）；`map` vs TS `Map/Record`（零值为 nil）；`struct` vs TS `interface`/`type`（强调内存布局与零值）；JSON 编解码 tag vs TS `class-transformer`/`zod`。
- 第 5 章 函数：多返回值 vs TS 解构返回对象/数组；错误返回值 vs TS `try/catch`/`Result` 模式；闭包捕获变量与 TS 一致但并发下需注意；`defer` 类比 `finally`，执行时机差异。
- 第 6 章 方法：值接收者/指针接收者 vs TS 类实例/引用语义；结构体嵌入扩展 vs TS `extends`/mixins；封装通过导出规则 vs TS `private/protected`。
- 第 7 章 接口：结构化类型系统与 TS 类似；隐式实现 vs TS 结构兼容；接口值为 `(type, value)`，`nil` 接口陷阱对比 TS `undefined`；类型断言 `v.(T)` vs TS `as`/类型守卫；type switch vs TS `switch (typeof …)`/自定义守卫。
- 第 8 章 Goroutine 与 Channel：goroutine 对比 JS 事件循环+任务队列（非 Promise）；channel 类比带缓冲队列/`AsyncIterator`；`select` vs `Promise.race`；超时/取消语义与 `AbortController`；并发爬虫示例映射到 `Promise.allSettled`。
- 第 9 章 共享内存并发：`Mutex/RWMutex` vs JS 事件循环无需锁的习惯；在 TS 中模拟锁（如 `async-mutex`）类比使用；`sync.Once` vs 单例初始化；竞态检测 vs TS 中的不可复现异步 bug。
- 第 10 章 包与工具：`go env`/`go env GOPATH` vs `npm config`；模块导入路径 vs TS `paths`/`baseUrl`；包匿名导入对比 TS side-effect import；`go list`/`go vet` 工具链 vs TS `tsc --noEmit`、`eslint --max-warnings 0`。
- 第 11 章 测试：`go test` 目录惯例 vs TS `vitest/jest`；表驱动测试与 TS 数据驱动测试；基准测试 vs `benchmark.js`；覆盖率 `-cover` vs `c8`；示例函数类似 Playwright/Jest 的 `examples`。
- 第 12 章 反射：`reflect.Type/Value` vs TS 运行时类型缺失（需元数据或校验库）；通过 `interface{}` 传递任意值 vs TS `any`；修改值需要可寻址 vs TS 可变引用；建议前端用 `zod`/`io-ts` 做对比。
- 第 13 章 低级：`unsafe` 对照 TS 极少用的 `as unknown as`/`Buffer` 操作；`cgo` 类比 TS 调 WebAssembly/原生扩展；强调生产禁用。
- 第 14 章 附录：重点标记与前端关联不大的内容，可只放提示与外链。

## 优先级与里程碑
- 里程碑 1：完成第 1、2、4、7、8 章的 TS 对照，覆盖入门、类型、接口、并发。
- 里程碑 2：补齐第 5、6、10、11 章，完善函数、方法、工具链、测试。
- 里程碑 3：收尾第 3、9、12、13、14 章，增加高级话题的对照与提醒。

## 验收标准
- 每节新增 TS 对照块；示例最小可运行；差异点突出；有 1~3 条踩坑提醒。
- 文档通过站点构建，无格式或 lint 报错；章节间术语一致。
