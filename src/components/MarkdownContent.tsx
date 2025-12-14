import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Prism 语言支持需要显式注册，否则即使 markdown 写了 ```go 也不会进行 token 高亮
import prismGo from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import prismBash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import prismJavascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import prismTypescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import prismPython from 'react-syntax-highlighter/dist/esm/languages/prism/python';

// react-syntax-highlighter 的类型定义有时不暴露 registerLanguage，这里用 any 兼容
const PrismLightHighlighter = SyntaxHighlighter as any;
PrismLightHighlighter.registerLanguage('go', prismGo);
PrismLightHighlighter.registerLanguage('bash', prismBash);
PrismLightHighlighter.registerLanguage('javascript', prismJavascript);
PrismLightHighlighter.registerLanguage('typescript', prismTypescript);
PrismLightHighlighter.registerLanguage('python', prismPython);

interface MarkdownContentProps {
  content: string;
}

// 代码块组件（带复制功能）
function CodeBlock({ language, children }: { language: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  // 自定义浅色主题，移除白色背景
  const lightTheme = useMemo(() => {
    const base = { ...oneLight };
    // 覆盖所有可能的背景色设置
    Object.keys(base).forEach((key) => {
      if (base[key] && typeof base[key] === 'object' && 'background' in base[key]) {
        base[key] = { ...base[key], background: 'transparent' };
      }
    });
    return base;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="soft-button flex items-center space-x-1 px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
          title="复制代码"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <div className="code-block-soft overflow-hidden">
        <div className="p-4 md:p-5">
          <SyntaxHighlighter
            language={language || 'text'}
            style={theme === 'dark' ? vscDarkPlus : lightTheme}
            customStyle={{
              margin: 0,
              padding: 0,
              fontSize: '0.875rem',
              lineHeight: '1.6',
              background: 'transparent !important',
            }}
            showLineNumbers={false}
            PreTag="div"
            CodeTag={({ children, ...props }: any) => (
              <code
                {...props}
                data-codeblock="true"
                style={{ ...props.style, background: 'transparent !important' }}
              >
                {children}
              </code>
            )}
            useInlineStyles={true}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ node, inline, className, children, ...props }: any) => {
            // react-markdown v9 中，`inline` 可能不存在/不稳定。
            // 用更稳的规则区分：
            // - 行内代码通常没有换行
            // - 代码块通常包含换行（即使只有一行，通常也会带末尾 \n）
            const raw = String(children ?? '');
            const hasLanguage = /language-\w+/.test(className || '');
            const isInline =
              typeof inline === 'boolean' ? inline : !(raw.includes('\n') || hasLanguage);

            if (isInline) {
              // 行内代码：使用 Soft UI 凹陷样式，不进行语法高亮
              return (
                <code 
                  className="soft-inset px-1.5 py-0.5 rounded text-sm font-mono inline-block" 
                  style={{ color: 'var(--accent)' }} 
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            // 代码块
            // 提取语言标识
            const match = /language-(\w+)/.exec(className || '');
            let language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            // 语言别名映射
            const languageMap: Record<string, string> = {
              'golang': 'go',
              'sh': 'bash',
              'shell': 'bash',
              'js': 'javascript',
              'ts': 'typescript',
              'py': 'python',
            };
            // 统一标准化为小写：markdown 里常见 ```Go / ```JSON 等写法
            const normalized = (language || '').toLowerCase();
            language = languageMap[normalized] || normalized || 'text';

            // 使用 CodeBlock 组件进行语法高亮
            return <CodeBlock language={language}>{codeString}</CodeBlock>;
          },
          pre: ({ children }: any) => {
            // pre 组件包裹代码块，直接返回 children（code 组件已经处理了）
            // 这样可以避免双重包裹
            return <>{children}</>;
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--text-primary)' }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2" style={{ color: 'var(--text-primary)' }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" style={{ color: 'var(--text-primary)' }}>{children}</ol>
          ),
          a: ({ href, children }) => (
            <a href={href} style={{ color: 'var(--accent)' }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 pl-4 italic my-4 py-2 rounded-r-lg" style={{ 
              borderColor: 'var(--accent)',
              color: 'var(--text-secondary)',
            }}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
