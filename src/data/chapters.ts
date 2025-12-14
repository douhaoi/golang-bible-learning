export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  path: string;
}

export const chapters: Chapter[] = [
  {
    id: '1',
    title: '入门',
    sections: [
      { id: '1.1', title: 'Hello, World', path: '/chapter/1/section/1.1' },
      { id: '1.2', title: '命令行参数', path: '/chapter/1/section/1.2' },
      { id: '1.3', title: '查找重复的行', path: '/chapter/1/section/1.3' },
      { id: '1.4', title: 'GIF动画', path: '/chapter/1/section/1.4' },
      { id: '1.5', title: '获取URL', path: '/chapter/1/section/1.5' },
      { id: '1.6', title: '并发获取多个URL', path: '/chapter/1/section/1.6' },
      { id: '1.7', title: 'Web服务', path: '/chapter/1/section/1.7' },
      { id: '1.8', title: '本章要点', path: '/chapter/1/section/1.8' },
    ],
  },
  {
    id: '2',
    title: '程序结构',
    sections: [
      { id: '2.1', title: '命名', path: '/chapter/2/section/2.1' },
      { id: '2.2', title: '声明', path: '/chapter/2/section/2.2' },
      { id: '2.3', title: '变量', path: '/chapter/2/section/2.3' },
      { id: '2.4', title: '赋值', path: '/chapter/2/section/2.4' },
      { id: '2.5', title: '类型', path: '/chapter/2/section/2.5' },
      { id: '2.6', title: '包和文件', path: '/chapter/2/section/2.6' },
      { id: '2.7', title: '作用域', path: '/chapter/2/section/2.7' },
    ],
  },
  {
    id: '3',
    title: '基础数据类型',
    sections: [
      { id: '3.1', title: '整型', path: '/chapter/3/section/3.1' },
      { id: '3.2', title: '浮点数', path: '/chapter/3/section/3.2' },
      { id: '3.3', title: '复数', path: '/chapter/3/section/3.3' },
      { id: '3.4', title: '布尔型', path: '/chapter/3/section/3.4' },
      { id: '3.5', title: '字符串', path: '/chapter/3/section/3.5' },
      { id: '3.6', title: '常量', path: '/chapter/3/section/3.6' },
    ],
  },
  {
    id: '4',
    title: '复合数据类型',
    sections: [
      { id: '4.1', title: '数组', path: '/chapter/4/section/4.1' },
      { id: '4.2', title: 'Slice', path: '/chapter/4/section/4.2' },
      { id: '4.3', title: 'Map', path: '/chapter/4/section/4.3' },
      { id: '4.4', title: '结构体', path: '/chapter/4/section/4.4' },
      { id: '4.5', title: 'JSON', path: '/chapter/4/section/4.5' },
      { id: '4.6', title: '文本和HTML模板', path: '/chapter/4/section/4.6' },
    ],
  },
  {
    id: '5',
    title: '函数',
    sections: [
      { id: '5.1', title: '函数声明', path: '/chapter/5/section/5.1' },
      { id: '5.2', title: '递归', path: '/chapter/5/section/5.2' },
      { id: '5.3', title: '多返回值', path: '/chapter/5/section/5.3' },
      { id: '5.4', title: '错误', path: '/chapter/5/section/5.4' },
      { id: '5.5', title: '函数值', path: '/chapter/5/section/5.5' },
      { id: '5.6', title: '匿名函数', path: '/chapter/5/section/5.6' },
      { id: '5.7', title: '可变参数', path: '/chapter/5/section/5.7' },
      { id: '5.8', title: 'Deferred函数', path: '/chapter/5/section/5.8' },
      { id: '5.9', title: 'Panic异常', path: '/chapter/5/section/5.9' },
      { id: '5.10', title: 'Recover捕获异常', path: '/chapter/5/section/5.10' },
    ],
  },
  {
    id: '6',
    title: '方法',
    sections: [
      { id: '6.1', title: '方法声明', path: '/chapter/6/section/6.1' },
      { id: '6.2', title: '基于指针对象的方法', path: '/chapter/6/section/6.2' },
      { id: '6.3', title: '通过嵌入结构体来扩展类型', path: '/chapter/6/section/6.3' },
      { id: '6.4', title: '方法值和方法表达式', path: '/chapter/6/section/6.4' },
      { id: '6.5', title: '示例: Bit数组', path: '/chapter/6/section/6.5' },
      { id: '6.6', title: '封装', path: '/chapter/6/section/6.6' },
    ],
  },
  {
    id: '7',
    title: '接口',
    sections: [
      { id: '7.1', title: '接口是合约', path: '/chapter/7/section/7.1' },
      { id: '7.2', title: '接口类型', path: '/chapter/7/section/7.2' },
      { id: '7.3', title: '实现接口的条件', path: '/chapter/7/section/7.3' },
      { id: '7.4', title: 'flag.Value接口', path: '/chapter/7/section/7.4' },
      { id: '7.5', title: '接口值', path: '/chapter/7/section/7.5' },
      { id: '7.6', title: 'sort.Interface接口', path: '/chapter/7/section/7.6' },
      { id: '7.7', title: 'http.Handler接口', path: '/chapter/7/section/7.7' },
      { id: '7.8', title: 'error接口', path: '/chapter/7/section/7.8' },
      { id: '7.9', title: '示例: 表达式求值', path: '/chapter/7/section/7.9' },
      { id: '7.10', title: '类型断言', path: '/chapter/7/section/7.10' },
      { id: '7.11', title: '基于类型断言识别错误类型', path: '/chapter/7/section/7.11' },
      { id: '7.12', title: '通过类型断言查询接口', path: '/chapter/7/section/7.12' },
      { id: '7.13', title: '类型分支', path: '/chapter/7/section/7.13' },
      { id: '7.14', title: '示例: 基于标记的XML解码', path: '/chapter/7/section/7.14' },
      { id: '7.15', title: '补充几点', path: '/chapter/7/section/7.15' },
    ],
  },
  {
    id: '8',
    title: 'Goroutines和Channels',
    sections: [
      { id: '8.1', title: 'Goroutines', path: '/chapter/8/section/8.1' },
      { id: '8.2', title: '示例: 并发的Clock服务', path: '/chapter/8/section/8.2' },
      { id: '8.3', title: '示例: 并发的Echo服务', path: '/chapter/8/section/8.3' },
      { id: '8.4', title: 'Channels', path: '/chapter/8/section/8.4' },
      { id: '8.5', title: '并发的循环', path: '/chapter/8/section/8.5' },
      { id: '8.6', title: '示例: 并发的Web爬虫', path: '/chapter/8/section/8.6' },
      { id: '8.7', title: '基于select的多路复用', path: '/chapter/8/section/8.7' },
      { id: '8.8', title: '示例: 并发的目录遍历', path: '/chapter/8/section/8.8' },
      { id: '8.9', title: '并发的退出', path: '/chapter/8/section/8.9' },
      { id: '8.10', title: '示例: 聊天服务', path: '/chapter/8/section/8.10' },
    ],
  },
  {
    id: '9',
    title: '基于共享变量的并发',
    sections: [
      { id: '9.1', title: '竞争条件', path: '/chapter/9/section/9.1' },
      { id: '9.2', title: 'sync.Mutex互斥锁', path: '/chapter/9/section/9.2' },
      { id: '9.3', title: 'sync.RWMutex读写锁', path: '/chapter/9/section/9.3' },
      { id: '9.4', title: '内存同步', path: '/chapter/9/section/9.4' },
      { id: '9.5', title: 'sync.Once惰性初始化', path: '/chapter/9/section/9.5' },
      { id: '9.6', title: '竞争条件检测', path: '/chapter/9/section/9.6' },
      { id: '9.7', title: '示例: 并发的非阻塞缓存', path: '/chapter/9/section/9.7' },
      { id: '9.8', title: 'Goroutines和线程', path: '/chapter/9/section/9.8' },
    ],
  },
  {
    id: '10',
    title: '包和工具',
    sections: [
      { id: '10.1', title: '包简介', path: '/chapter/10/section/10.1' },
      { id: '10.2', title: '导入路径', path: '/chapter/10/section/10.2' },
      { id: '10.3', title: '包声明', path: '/chapter/10/section/10.3' },
      { id: '10.4', title: '导入声明', path: '/chapter/10/section/10.4' },
      { id: '10.5', title: '包的匿名导入', path: '/chapter/10/section/10.5' },
      { id: '10.6', title: '包和命名', path: '/chapter/10/section/10.6' },
      { id: '10.7', title: '工具', path: '/chapter/10/section/10.7' },
    ],
  },
  {
    id: '11',
    title: '测试',
    sections: [
      { id: '11.1', title: 'go test', path: '/chapter/11/section/11.1' },
      { id: '11.2', title: '测试函数', path: '/chapter/11/section/11.2' },
      { id: '11.3', title: '测试覆盖率', path: '/chapter/11/section/11.3' },
      { id: '11.4', title: '基准测试', path: '/chapter/11/section/11.4' },
      { id: '11.5', title: '剖析', path: '/chapter/11/section/11.5' },
      { id: '11.6', title: '示例函数', path: '/chapter/11/section/11.6' },
    ],
  },
  {
    id: '12',
    title: '反射',
    sections: [
      { id: '12.1', title: '为何需要反射?', path: '/chapter/12/section/12.1' },
      { id: '12.2', title: 'reflect.Type和reflect.Value', path: '/chapter/12/section/12.2' },
      { id: '12.3', title: 'Display递归打印', path: '/chapter/12/section/12.3' },
      { id: '12.4', title: '示例: 编码S表达式', path: '/chapter/12/section/12.4' },
      { id: '12.5', title: '通过reflect.Value修改值', path: '/chapter/12/section/12.5' },
      { id: '12.6', title: '示例: 解码S表达式', path: '/chapter/12/section/12.6' },
      { id: '12.7', title: '获取结构体字段标签', path: '/chapter/12/section/12.7' },
      { id: '12.8', title: '显示一个类型的方法集', path: '/chapter/12/section/12.8' },
      { id: '12.9', title: '几点忠告', path: '/chapter/12/section/12.9' },
    ],
  },
  {
    id: '13',
    title: '底层编程',
    sections: [
      { id: '13.1', title: 'unsafe.Sizeof, Alignof 和 Offsetof', path: '/chapter/13/section/13.1' },
      { id: '13.2', title: 'unsafe.Pointer', path: '/chapter/13/section/13.2' },
      { id: '13.3', title: '示例: 深度相等判断', path: '/chapter/13/section/13.3' },
      { id: '13.4', title: '通过cgo调用C代码', path: '/chapter/13/section/13.4' },
      { id: '13.5', title: '几点忠告', path: '/chapter/13/section/13.5' },
    ],
  },
  {
    id: '14',
    title: '附录',
    sections: [
      { id: '14.1', title: '附录A：原文勘误', path: '/chapter/14/section/14.1' },
      { id: '14.2', title: '附录B：作者译者', path: '/chapter/14/section/14.2' },
      { id: '14.3', title: '附录C：译文授权', path: '/chapter/14/section/14.3' },
      { id: '14.4', title: '附录D：其它语言', path: '/chapter/14/section/14.4' },
    ],
  },
];

export const getChapterById = (id: string): Chapter | undefined => {
  return chapters.find((ch) => ch.id === id);
};

export const getSectionById = (
  sectionId: string
): { chapter: Chapter; section: Section } | undefined => {
  for (const chapter of chapters) {
    const section = chapter.sections.find((s) => s.id === sectionId);
    if (section) {
      return { chapter, section };
    }
  }
  return undefined;
};
