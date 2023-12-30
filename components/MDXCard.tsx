import React, {useEffect, useState} from 'react';
import {compileMDX} from 'next-mdx-remote/rsc'
import {Card, CardBody, Image} from "@nextui-org/react";
import {CalendarDays} from "lucide-react";
import dayjs from "dayjs";


interface Props {
    path: string;
    content: string;
}

const MDXCard = ({path, content}: Props) => {
    const [main, setMain] = useState<{
        title: string;
        date: Date;
        updated: Date;
        author?: string;
        excerpt?: string;
    } | null>(null)

    useEffect(() => {
        compileMDX({
            source: content,
            options: {
                parseFrontmatter: true,
            }
        })
            .then((res) => {
                setMain(res?.frontmatter as any || null)
            })
    }, [content])


    return (
        <Card className={"h-[400px] md:h-[200px] select-none"}>
            <CardBody className={"flex flex-row gap-8 items-center px-8"}>
                <Image
                    isZoomed
                    isBlurred
                    src={"/images/home.jpg"}
                    className={"w-56"}
                />
                <article className={"flex flex-1 flex-col h-full justify-between py-4"}>
                    <div>
                        <h4 className="font-bold text-large">{main?.title}</h4>
                        <h5 className="text-gray-500 line-clamp-3">{main?.excerpt}</h5>
                    </div>
                    {
                        main?.date && (
                            <div className={"flex gap-1 items-center text-sm text-gray-400"}>
                                <CalendarDays size={20}/>
                                <span>{dayjs(main?.date).format("YYYY-MM-DD")}</span>
                            </div>
                        )
                    }
                </article>
            </CardBody>
        </Card>
    );
};

export default MDXCard;


