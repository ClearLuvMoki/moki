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
import {useTheme} from "next-themes"
import Typewriter from 'typewriter-effect';
import {BarChartBig, CalendarDays, ClipboardEdit, Hourglass} from "lucide-react";
import dayjs from "dayjs";
import reading from "reading-time";


interface Props {
    blog: {
        source: string;
        content: string;
    };
}

interface State {
    content: MDXRemoteSerializeResult | null;
}

export default function Blog({blog}: Props) {
    const {theme} = useTheme();
    const [state, setState] = useSetState<State>({
        content: null
    })

    useEffect(() => {
        if (blog) {
            setState({
                content: JSON.parse(blog?.source)
            })
        }
    }, [blog])


    return (
        <div className="h-screen">
            <Head/>
            <Navbar/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
                <div className={"m-auto flex flex-col justify-center items-center h-[500px]"}>
                    <div className={"text-4xl font-bold"}>
                        <Typewriter
                            options={{
                                autoStart: true,
                                cursor: "_",
                                loop: true
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString(state.content?.frontmatter?.title as string || "")
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .start()
                            }}
                        />
                    </div>
                    <div className={"flex gap-4 mt-4"}>
                       <span className={"flex justify-center items-center gap-2"}>
                           <ClipboardEdit
                               size={16}
                           />
                           <span>
                               {state?.content?.frontmatter?.author as string}
                           </span>
                       </span>
                        <span className={"flex justify-center items-center gap-2"}>
                           <CalendarDays
                               size={16}
                           />
                           <span>
                               {state?.content?.frontmatter?.date as string ? dayjs(state?.content?.frontmatter?.date as Date || "").format("YYYY-MM-DD") : "2000-01-01"}
                           </span>
                       </span>
                    </div>
                    <div className={"flex gap-4"}>
                        <span className={"flex justify-center items-center gap-2"}>
                           <BarChartBig
                               size={16}
                           />
                           <span>
                               {reading(blog?.content || "").words}
                           </span>
                       </span>
                        <span className={"flex justify-center items-center gap-2"}>
                           <Hourglass
                               size={16}
                           />
                           <span>
                               {reading(blog?.content || "").text}
                           </span>
                       </span>
                    </div>
                </div>
                <Card>
                    <CardBody className={"py-6 px-10"}>
                        {
                            state.content?.scope && (
                                <MDXRemote
                                    {...state.content}
                                    components={{
                                        ...MDXComponents,
                                    }}
                                />
                            )
                        }
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
            blog: {
                source: JSON.stringify(mdxSource),
                content
            }
        }
    }
}





