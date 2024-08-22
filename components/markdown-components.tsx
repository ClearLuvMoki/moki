import React, {HTMLAttributes} from 'react';
import {Image} from "@nextui-org/react"
import CodeRender from "@/components/code-render";

const MarkdownComponents = {
    h1: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h1 {...props} className={"text-3xl font-bold border-b-1 pb-4 my-6"}>
            {props.children}
        </h1>
    ),
    h2: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-2xl font-bold my-4"}>
            {props.children}
        </h2>
    ),
    h3: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-xl font-bold my-4"}>
            {props.children}
        </h2>
    ),
    h4: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-xl font-bold my-4"}>
            {props.children}
        </h2>
    ),
    p: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 {...props} className={"text-base mb-2"}>
            {props.children}
        </h2>
    ),
    ul: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
        <ul {...props} className={"list-disc list-inside"}>
            {props.children}
        </ul>
    ),
    ol: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
        <ol {...props} className={"list-decimal list-inside"}>
            {props.children}
        </ol>
    ),
    a: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
        return <a
            {...props}
            className="underline underline-offset-2"
        >
            {props?.children}
        </a>
    },
    img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
        const alt = props?.alt;
        return <div
            className={`w-full my-4 sm:w-[45%]`}
        >
            <Image
                isBlurred
                alt={props?.alt}
                src={props?.src}
                classNames={{
                    wrapper: props?.className || "w-full",
                    img: "w-full"
                }}
            />
            {
                alt && (<div className="my-2 select-none font-bold text-sm flex justify-center">{`图(${alt})`}</div>)
            }
        </div>
    },
    code: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
        const {children, className} = props;
        const isInline = children && !Boolean((children as string)?.includes("\n"));
        const language = /language-(\w+)/.exec(className || '')?.[0]?.split("language-")?.[1] || "";
        let content = String(children);
        return <CodeRender
            type={isInline ? "inline" : "block"}
            language={language}
        >{content}</CodeRender>
    }
};

export default MarkdownComponents;
