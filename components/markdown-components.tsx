import React from 'react';

const MarkdownComponents = {
    h1: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h1 {...props} className={"text-3xl font-bold border-b-1 pb-2 mb-6"}>
            {props.children}
        </h1>
    ),
    h2: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-2xl font-bold mb-4"}>
            {props.children}
        </h2>
    ),
    h3: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-2xl font-bold mb-4"}>
            {props.children}
        </h2>
    ),
    h4: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-xl font-bold mb-4"}>
            {props.children}
        </h2>
    ),
    p: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-base mb-2"}>
            {props.children}
        </h2>
    ),
    ul:(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
        <ul {...props} className={"list-disc list-inside"}>
            {props.children}
        </ul>
    ),
    ol:(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
        <ol {...props} className={"list-decimal list-inside"}>
            {props.children}
        </ol>
    ),
};

export default MarkdownComponents;
