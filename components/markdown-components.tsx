/*
 * @Author: moki 2893096286@qq.com
 * @Date: 2024-11-16 18:06:14
 * @LastEditors: moki 2893096286@qq.com
 * @LastEditTime: 2024-12-04 19:50:16
 * @FilePath: /moki-blog/components/markdown-components.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'react-photo-view/dist/react-photo-view.css';
import React from 'react';
import {Image} from "@heroui/react"
import {PhotoProvider, PhotoView} from 'react-photo-view';
import CodeRender from "@/components/code-render";


const MarkdownComponents = {
    h1: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h1 className={"text-3xl font-bold border-b-1 pb-4 my-6"} id={`${props?.children}`}>
            {props.children}
        </h1>
    ),
    h2: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 className={"text-2xl font-bold my-4"} id={`${props?.children}`}>
            {props.children}
        </h2>
    ),
    h3: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 className={"text-xl font-bold my-4"} id={`${props?.children}`}>
            {props.children}
        </h2>
    ),
    h4: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 className={"text-xl font-bold my-4"} id={`${props?.children}`}>
            {props.children}
        </h2>
    ),
    p: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <div {...props} className={"text-base mb-2"}>
            {props.children}
        </div>
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
        return <PhotoProvider>
            <div
                className={`w-full my-4 sm:w-[45%]`}
            >
                <PhotoView src={props?.src}>
                    <Image
                        isBlurred
                        alt={props?.alt}
                        src={props?.src}
                        classNames={{
                            wrapper: props?.className || "w-full",
                            img: "w-full"
                        }}
                    />
                </PhotoView>
                {
                    alt && (
                        <div className="my-2 select-none font-bold text-sm flex justify-center">{`图(${alt})`}</div>)
                }
            </div>
        </PhotoProvider>
    },
    blockquote: (props: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
        <blockquote {...props}
                    className="ml-2 pl-2 border-l-4 border-l-zinc-500 text-zinc-500 my-4">{props?.children}</blockquote>
    ),
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
