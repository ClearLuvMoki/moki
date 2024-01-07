import React from 'react';
import {Card, CardBody} from "@nextui-org/react";

interface Props {
    title: string;
    date: Date;
    content: string;
    images: string[];
}

const FragmentCard = ({title}: Props) => {
    return (
        <Card className={"w-full"}>
            <CardBody>
                <h2 className={"text-xl"}>{title}</h2>
            </CardBody>
        </Card>
    );
};

export default FragmentCard;
