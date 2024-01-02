import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import {Head} from "@/layouts/head";
import {Navbar} from "@/components/navbar";
import {serialize} from 'next-mdx-remote/serialize'
import {CryptoSearchKey} from "@/utils/tools";
import {GetStaticPaths, GetStaticProps} from "next";
import path from "path";


export default function Blog() {
    const router = useRouter();
    const [content, setContent] = useState({
        title: "",
        content: null
    })

    useEffect(() => {
    }, [])


    return (
        <div className="h-screen">
            <Head/>
            <Navbar/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow">

            </main>
        </div>
    );
};





