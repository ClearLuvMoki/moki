import "./index.css"
import {AppProps} from "next/app";
import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";
import React from "react";
import '../i18n';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


export default function App(
    {Component, pageProps}: AppProps) {
    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                <NextUIProvider>
                    <Component {...pageProps} />
                </NextUIProvider>
            </QueryClientProvider>
        </React.Fragment>
    )
}
