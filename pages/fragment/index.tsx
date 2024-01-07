import React from 'react';
import DefaultLayout from "@/layouts/default";
import {GetStaticProps} from "next";
import * as fs from "fs";
import * as path from "path";
import FragmentCard from "@/components/FragmentCard";

interface Props {
    files: {
        path: string;
        content: string;
    }[]
}

export const getStaticProps: GetStaticProps = async () => {
    const files = getLocalFragmentFiles(path.resolve("./public/fragment-docs"));
    return {
        props: {
            files
        }
    }
}

const getLocalFragmentFiles = (dir: string) => {
    let filesContent: any[] = [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        let name = path.resolve(dir + '/' + files[i]);
        const filePath = path.resolve(name);
        const content = fs.readFileSync(filePath, "utf-8")
        filesContent.push({
            path: filePath,
            content
        });
    }
    return filesContent;
}


const Fragment = ({files}: Props) => {

    return (
        <DefaultLayout>
            {
                files.map(card => (
                    <FragmentCard
                        key={card.path}
                        content={card.content}
                    />
                ))
            }
        </DefaultLayout>
    );
};

export default Fragment;


