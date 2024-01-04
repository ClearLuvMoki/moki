import React, {useEffect} from 'react';
import {Head} from "@/layouts/head";
import {Navbar} from "@/components/navbar";
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {CryptoSearchKey} from "@/utils/tools";
import {GetServerSideProps} from "next";
import {useSetState} from "react-use";
import slug from 'remark-slug'; // 为html标签添加id（锚点跳转）
import remarkGfm from 'remark-gfm';// 渲染表格插件
import {Card, CardBody} from "@nextui-org/react";
import MDXComponents from "@/components/MDXComponents";


interface Props {
    blog: string;
}

interface State {
    content: MDXRemoteSerializeResult | null;
}

export default function Blog({blog}: Props) {
    const [state, setState] = useSetState<State>({
        content: null
    })


    useEffect(() => {
        if (blog) {
            setState({
                content: JSON.parse(blog)
            })
        }
    }, [blog])


    return (
        <div className="h-screen">
            <Head/>
            <Navbar/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
                <Card>
                    <CardBody>
                        {
                            state.content?.scope && (
                                <MDXRemote
                                    {...state.content}
                                    components={MDXComponents}
                                />
                            )}
                    </CardBody>
                </Card>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const fs = require("fs");
    const toc = require("@jsdevtools/rehype-toc"); // 生成目录
    const rehypePrism = require('@mapbox/rehype-prism'); // 添加代码高亮

    let tocElement;
    const path = CryptoSearchKey.deCode(context.query.path as string);
    const content = fs.readFileSync(path, "utf-8");
    const mdxSource = await serialize(content, {
        scope: {},
        mdxOptions: {
            remarkPlugins: [slug, remarkGfm],
            rehypePlugins: [rehypePrism, [toc, {
                headings: ['h1', 'h2', 'h3', 'h4'],
                customizeTOC: (tocAll: any) => {
                    tocElement = tocAll
                    return false
                }
            }]],
            format: 'mdx'
        },
        parseFrontmatter: true
    })

    return {
        props: {
            blog: JSON.stringify(mdxSource)
        }
    }
}





