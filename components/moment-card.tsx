import { Card, CardBody, image, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

interface Props {
    content: string;
    images: string[];
}

const MomentCard = ({ images, content }: Props) => {
    const [url, setUrl] = useState([])

    useEffect(() => {
        if(images && images.length > 0) {
            Promise.allSettled(images.map(async item => {
                const fetchRes = await fetch(item);
                const buffer = await fetchRes.arrayBuffer();
                const base64 = Buffer.from(buffer).toString('base64');
                return base64;
            }))
            .then((promiseRes) => {
                const res = promiseRes.filter(item => item.status === "fulfilled").map(item => item.value);
                setUrl(res as any);
            }) 
        }
    }, [images])


    return (
        <Card className={"select-none mb-4 " +
            "md:h-[200px]"}
        >
            <CardBody className={"flex items-center gap-1 px-8 " +
                "md:flex-row md:gap-8 "}
            >
                {
                    (url || []).map((src, index) => {
                        return (
                            <Image
                                key={index}
                                alt=''
                                isZoomed
                                isBlurred
                                src={src}
                                className={"w-[270px] h-[160px]"}
                            />
                        )
                    })
                }
            </CardBody>
        </Card>
    )
}

export default MomentCard