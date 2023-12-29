import React, {useEffect, useState} from 'react';
import {serialize} from 'next-mdx-remote/serialize'
import {Card, CardBody} from "@nextui-org/react";


interface Props {
    path: string;
    content: string;
}

const MDXCard = ({path, content}: Props) => {
    const [main, setMain] = useState<{
        title: string;
        data: Date;
        updated: Date;
        author?: string;
        excerpt?: string;
    } | null>(null)

    useEffect(() => {
        serialize((content || ""), {
            parseFrontmatter: true
        })
            .then((res) => {
                console.log(res?.frontmatter)
                setMain(res?.frontmatter as any || null)
            })
    }, [content])


    return (
        <Card>
            <CardBody>
                <div>
                    <span>{main?.title}</span>
                </div>
            </CardBody>
        </Card>
    );
};

export default MDXCard;


