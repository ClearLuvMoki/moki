import React from 'react';
import {Card, CardBody} from "@heroui/react";
import Editor from '@monaco-editor/react';

interface Props {
    code: string;
}

const CodeCard = (props: Props) => {
    return (
        <Card className={"select-none mb-4 md:h-[200px]"}
        >
            <CardBody className={"flex px-8 md:flex-row"}>
                <Editor
                    className="w-6/12 md:w-full"
                    theme={"vs-dark"}
                    defaultLanguage="javascript" defaultValue={props?.code}
                />
                <div className="w-full md:w-6/12 ">
                    13123
                </div>
            </CardBody>
        </Card>
    );
};

export default CodeCard;
