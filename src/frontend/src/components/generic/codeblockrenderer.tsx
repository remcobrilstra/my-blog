'use client'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useCallback } from 'react';
import CopyButton from "./copybutton";


const CodeBlockRender = ({ content }: { content: string }) => {


    interface CodeBlockProps {
        inline?: boolean;
        className?: string;
        children?: React.ReactNode;
    }
    
    
    const renderCodeBlock = useCallback(({ inline, className, children, ...props }: CodeBlockProps) => {
        const match = /language-(\w+)/.exec(className || '');
        const codeText = String(children).replace(/\n$/, '');
    
        return !inline && match ? (
            <div className="group relative">
                <CopyButton text={codeText} />
                <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {codeText}
                </SyntaxHighlighter>
            </div>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    }, []);


    return (
        <ReactMarkdown
            components={{ code: renderCodeBlock }}
            >
            {content}
        </ReactMarkdown>
    );
};

export default CodeBlockRender;