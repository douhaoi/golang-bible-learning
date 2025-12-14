/**
 * 章节底部组件 - 显示二维码和其他底部内容
 */
export default function SectionFooter() {
  return (
    <div className="mt-12 pt-8 border-t-2 border-opacity-40" style={{ borderColor: 'var(--text-secondary)' }}>
      {/* 二维码容器 */}
      <div className="flex flex-wrap justify-center gap-6 items-center">
        <a 
          href="https://chai2010.cn/advanced-go-programming-book/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-105"
        >
          <img
            src="https://chai2010.cn/advanced-go-programming-book/css.png"
            alt="CSS 公众号"
            loading="lazy"
            decoding="async"
            className="soft-raised p-3 rounded-2xl h-auto"
            style={{ maxWidth: '300px', width: '100%', flexShrink: 0 }}
          />
        </a>
        <a 
          href="https://chai2010.cn/advanced-go-programming-book/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-105"
        >
          <img
            src="https://chai2010.cn/advanced-go-programming-book/cch.png"
            alt="CCH 公众号"
            loading="lazy"
            decoding="async"
            className="soft-raised p-3 rounded-2xl h-auto"
            style={{ maxWidth: '300px', width: '100%', flexShrink: 0 }}
          />
        </a>
      </div>

      {/* 版权信息（可选） */}
      <div className="mt-6 text-center text-sm opacity-60" style={{ color: 'var(--text-secondary)' }}>
        <p>内容来源于《Go语言圣经》中文版</p>
      </div>
    </div>
  );
}

