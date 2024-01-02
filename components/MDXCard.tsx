import React, {useEffect, useState} from 'react';
import {serialize} from 'next-mdx-remote/serialize'
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
        img?: string;
    } | null>(null)

    useEffect(() => {
        serialize(content, {
                parseFrontmatter: true,
        })
            .then((res) => {
                setMain(res?.frontmatter as any || null)
            })
    }, [content])


    return (
        <Card className={"select-none mb-4 " +
            "md:h-[200px]"}
        >
            <CardBody className={"flex items-center gap-1 px-8 " +
                "md:flex-row md:gap-8 "}>
                <Image
                    isZoomed
                    isBlurred
                    src={`/images/${main?.img}`}
                    className={"w-[270px] h-[160px]"}
                />
                <article className={"flex flex-col h-full justify-between py-4 w-[270px] " +
                    "md:flex-1"}>
                    <div className={"hover:cursor-pointer hover:text-[#7dd3fc]"}>
                        <h4 className="font-bold text-large">{main?.title}</h4>
                        <h5 className="text-gray-500 line-clamp-3">{main?.excerpt}</h5>
                    </div>
                    {
                        main?.date && (
                            <div className={"flex gap-1 items-center text-sm text-gray-400 mt-4 " +
                                "md:mt-0"}>
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


