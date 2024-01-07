import DefaultLayout from "@/layouts/default";
import {GetStaticProps} from "next";
import * as fs from "fs";
import * as path from "path";
import MDXCard from "@/components/MDXCard";

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
                            <MDXCard
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

export const getStaticProps: GetStaticProps = async () => {
    const files = getLocalMdFiles(path.resolve("./public/docs"));
    return {
        props: {
            files: (files || []).reverse(),
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
            const content = fs.readFileSync(filePath, "utf-8")
            filesContent.push({
                path: filePath,
                content
            });
        }
    }
    return filesContent;
}

