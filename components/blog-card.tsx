import React, {useEffect, useState} from 'react';
import {Card, CardBody, Image} from "@nextui-org/react";
import {CalendarDays} from "lucide-react";
import {useRouter} from "next/router";
import {CryptoSearchKey, RenderTransformMarkdown} from "@/utils/tools";
import {FrontMatterType} from "@/types";


interface Props {
    path: string;
    content: string;
}

const BlogCard = ({path, content}: Props) => {
    const router = useRouter()

    const [main, setMain] = useState<FrontMatterType| null>(null)

    useEffect(() => {
        if(content) {
            RenderTransformMarkdown(content)
                .then((res) => {
                    if(res?.frontMatter) {
                        setMain(res?.frontMatter)
                    }
                })
        }
    }, [content])

    const handleClick = () => {
        const cipherPath = CryptoSearchKey.enCode(path);
        router.push({
            pathname: "/blog",
            query: {
                path: cipherPath
            }
        })
    }


    return (
        <Card className={"select-none mb-4 " +
            "md:h-[200px]"}
        >
            <CardBody className={"flex items-center gap-1 px-8 " +
                "md:flex-row md:gap-8 "}>
                <Image
                    isZoomed
                    alt=''
                    isBlurred
                    src={main?.img ? main?.img?.startsWith("http") ? main?.img : `/images/${main?.img}`: ""}
                    className={"w-[270px] h-[160px]"}
                />
                <article
                    className={"flex flex-col h-full justify-between py-4 w-[270px] " +
                        "md:flex-1"
                    }
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <div className={"hover:cursor-pointer hover:text-[#7dd3fc]"}>
                        <h4 className="font-bold text-large">{main?.title}</h4>
                        <h5 className="text-gray-500 line-clamp-3">{main?.excerpt}</h5>
                    </div>
                    {
                        main?.date && (
                            <div className={"flex gap-1 items-center text-sm text-gray-400 mt-4 " +
                                "md:mt-0"}>
                                <CalendarDays size={20}/>
                                <span>{main?.date}</span>
                            </div>
                        )
                    }
                </article>
            </CardBody>
        </Card>
    );
};

export default BlogCard;


