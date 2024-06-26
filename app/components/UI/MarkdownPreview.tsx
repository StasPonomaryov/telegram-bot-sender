import { simpleMarkdown } from '@/lib/utils';
import { FC } from 'react';
// import ReactMarkdown from 'react-markdown';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IMarkdownPreviewProps {
  messageText: string;
  botName?: string;
}

const MarkdownPreview: FC<IMarkdownPreviewProps> = ({ messageText, botName }) => {
  return (
    <fieldset className="fieldset-block">
      <legend className="text-sm">{botName || ''}(перегляд)</legend>
      <div
        className="fieldset-text"
        dangerouslySetInnerHTML={{
          __html: simpleMarkdown(messageText.replace(/  /g, '<br />')),
        }}
      >
        {/* <ReactMarkdown
          className="line-break"
          components={{
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter language={match[1]} style={tomorrow}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {messageText}
        </ReactMarkdown> */}
      </div>
    </fieldset>
  );
};

export default MarkdownPreview;
