import React from "react";
import {Navbar} from "@/components/navbar";
import {Head} from "./head";
import {FilesType} from "@/types";

export default function DefaultLayout(
    {
        children,
        files
    }: {
        children: React.ReactNode;
        files?: FilesType[]
    }) {
    return (
        <React.Fragment>
            <Head/>
            <Navbar
                files={files}
            />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
                {children}
            </main>
            <footer className={"h-40 w-full"}>
            </footer>
        </React.Fragment>
    );
}
