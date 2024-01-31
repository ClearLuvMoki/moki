import React, {useEffect, useState} from 'react';
import {Card, CardBody, Image} from "@nextui-org/react";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemoteSerializeResult} from "next-mdx-remote"
import {CalendarRange} from "lucide-react";
import dayjs from "dayjs";

interface Props {
    content: string;
}

const FragmentCard = ({content}: Props) => {
    const [main, setMain] = useState<{
        title: string;
        date: Date;
        images?: string[];
        excerpt: string;
    } | null>(null)
    const [md, setMd] = useState<MDXRemoteSerializeResult | null>(null)


    useEffect(() => {
        serialize(content, {

            parseFrontmatter: true,
        })
            .then((res) => {
                setMain(res?.frontmatter as any || null)
            })
    }, [content])

    return (
        <Card className={"md:w-8/12 m-auto"}>
            <CardBody className={"px-10 py-5 flex flex-row gap-4 items-start"}>
                <Image src={"/avatar.png"} className={"w-10 h-10 min-w-unit-10"}/>
                <div>
                    <h2 className={"text-2xl font-medium mb-4"}>{main?.title}</h2>
                    <p className={"mb-4"}>{main?.excerpt}</p>
                    {/*<div>*/}
                    {/*    {*/}
                    {/*        md?.scope && (*/}
                    {/*            <MDXRemote*/}
                    {/*                {...md}*/}
                    {/*                components={{*/}
                    {/*                    ...MDXComponents,*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</div>*/}
                    {
                        main?.images?.map(img => (
                            <Image
                                isZoomed
                                className={"h-[200px]"}
                                key={img}
                                src={`/images/${img}`}
                            />
                        ))
                    }
                    {
                        main?.date && (
                            <div className={"flex text-sm items-center gap-2 mt-2 text-gray-500"}>
                                <CalendarRange size={16}/>
                                <span>{dayjs(main?.date as unknown as string).format("YYYY-MM-DD")}</span>
                            </div>
                        )
                    }
                </div>

            </CardBody>
        </Card>
    );
};

export default FragmentCard;
