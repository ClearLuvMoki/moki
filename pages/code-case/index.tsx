import React from 'react';
import DefaultLayout from "@/layouts/default";
import CodeCard from "@/components/code-card";


export default function CodeCase() {
    return (
        <DefaultLayout>
            <div className={"m-auto flex flex-col justify-center items-center h-[500px]"}>
                <div className={"w-full lg:w-[900px] xl:w-[1100px]"}>
                    <CodeCard code={"console.log"}/>
                </div>
            </div>
        </DefaultLayout>
    );
};

