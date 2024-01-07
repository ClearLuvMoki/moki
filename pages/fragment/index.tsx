import React from 'react';
import DefaultLayout from "@/layouts/default";
import {GetStaticProps} from "next";
import * as fs from "fs";
import * as path from "path";

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
            1212
        </DefaultLayout>
    );
};

export default Fragment;


