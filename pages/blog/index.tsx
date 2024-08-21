import React, {useEffect} from 'react';
import {CryptoSearchKey, RenderTransformMarkdown} from "@/utils/tools";
import {GetServerSideProps} from "next";
import {useSetState} from "react-use";
import {Card, CardBody} from "@nextui-org/react";
import reading from "reading-time";
import DefaultLayout from "@/layouts/default";
import {MarkdownType} from "@/types";
import MarkdownRender from "@/components/markdown-render";
import {BarChartBig, CalendarDays, ClipboardEdit, Hourglass} from "lucide-react";
import {Typewriter} from "react-simple-typewriter";

interface Props {
    content: string;
}

export default function Blog({content}: Props) {
    const [state, setState] = useSetState<MarkdownType>({
        frontMatter: null,
        content: ""
    })

    useEffect(() => {
        RenderTransformMarkdown(content)
            .then((res) => {
                setState({
                    frontMatter: res?.frontMatter,
                    content: res?.content || ""
                })
            })
    }, [content])


    return (
        <DefaultLayout>
            <div className={"m-auto flex flex-col justify-center items-center h-[500px]"}>
                <div className={"text-4xl font-bold"}>
                    <Typewriter
                        loop={true}
                        cursor
                        cursorStyle='_'
                        words={[state?.frontMatter?.title as string]}
                        delaySpeed={3000}
                    />
                </div>
                <div className={"flex gap-4 mt-4"}>
                       <span className={"flex justify-center items-center gap-2"}>
                           <ClipboardEdit
                               size={16}
                           />
                           <span>
                               {state?.frontMatter?.author as string}
                           </span>
                       </span>
                    <span className={"flex justify-center items-center gap-2"}>
                           <CalendarDays
                               size={16}
                           />
                           <span>
                               {state?.frontMatter?.date || "2000-01-01"}
                           </span>
                       </span>
                </div>
                <div className={"flex gap-4"}>
                        <span className={"flex justify-center items-center gap-2"}>
                           <BarChartBig
                               size={16}
                           />
                           <span>
                               {reading(state?.content || "").words}
                           </span>
                       </span>
                    <span className={"flex justify-center items-center gap-2"}>
                           <Hourglass
                               size={16}
                           />
                           <span>
                               {reading(state?.content || "").text}
                           </span>
                       </span>
                </div>
            </div>
            <Card className={"lg:w-8/12 md:w-10/12 m-auto"}>
                <CardBody className={"py-6 px-10"}>
                    {
                        state.content && (
                            <MarkdownRender
                            >
                                {state.content}
                            </MarkdownRender>
                        )
                    }
                </CardBody>
            </Card>
        </DefaultLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const fs = require("fs");
    const path = CryptoSearchKey.deCode(context.query.path as string);
    const content = fs.readFileSync(path, "utf-8");

    return {
        props: {
            content
        }
    }
}





