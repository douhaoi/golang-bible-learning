import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface MarkdownContentProps {
  content: string;
}

// 代码块组件（带复制功能）
function CodeBlock({ language, children }: { language: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

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
    <div className="relative group">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleCopy}
          className="soft-button flex items-center space-x-1 px-2 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
          title="复制代码"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={theme === 'dark' ? vscDarkPlus : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: 'var(--bg-primary)',
        }}
        showLineNumbers={false}
        PreTag="div"
      >
        {children}
      </SyntaxHighlighter>
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
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && language) {
              return <CodeBlock language={language}>{codeString}</CodeBlock>;
            }

            // 行内代码
            return (
              <code className="soft-inset px-1.5 py-0.5 rounded text-sm font-mono" style={{ color: 'var(--accent)' }} {...props}>
                {children}
              </code>
            );
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
