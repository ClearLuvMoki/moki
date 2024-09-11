import React from 'react';
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import MarkdownComponents from "@/components/markdown-components";


interface Props {
    children: string;
    className?: string;
}

const MarkdownRender = ({ children, className }: Props) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={MarkdownComponents}
            className={className}
        >
            {children}
        </ReactMarkdown>
    );
};

export default MarkdownRender;
