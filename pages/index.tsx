import DefaultLayout from "@/layouts/default";
import {GetServerSideProps} from "next";
import * as fs from "fs";
import * as path from "path";
import matter from 'gray-matter';
import BlogCard from "@/components/blog-card";

interface Props {
    files: {
        path: string;
        content: string;
    }[];
}

export default function IndexPage({files}: Props) {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={"tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9"}>Moki</h1>
                    <br/>
                    <h4 className={"w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full !w-full mt-4"}>
                        不如去西湖吹吹风吧
                    </h4>
                </div>

                <div className={"w-full lg:w-[900px] xl:w-[1100px]"}>
                    {
                        (files || []).map((md, index) => (
                            <BlogCard
                                key={index}
                                path={md.path}
                                content={md.content}
                            />
                        ))
                    }
                </div>
            </section>
        </DefaultLayout>
    );
}


export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader('Cache-Control', 'no-store');
    const files = getLocalMdFiles(path.resolve("./public/docs"));
    return {
        props: {
            files: (files || []),
        },
    };
};


function getLocalMdFiles(dir: string) {
    let filesContent: any[] = [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        let name = path.resolve(dir + '/' + files[i]);
        if (fs.statSync(name).isDirectory()) {
            filesContent = filesContent.concat(getLocalMdFiles(name) || []);
        } else {
            const filePath = path.resolve(name);
            const fileName = path.parse(filePath)?.base;
            if (fileName && !fileName.startsWith("_")) {
                const content = fs.readFileSync(filePath, "utf-8")
                const transformData = matter(content);
                filesContent.push({
                    date: transformData.data?.date || "",
                    path: filePath,
                    content
                });
            }
        }
    }
    filesContent = (filesContent || [])?.sort((pre, next) => next.date - pre.date).map(item => {
        return {
            path: item.path,
            content: item.content
        }
    })
    return filesContent
}



