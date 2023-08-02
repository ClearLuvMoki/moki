import "./index.css"
import {AppProps} from "next/app";
import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";
import React from "react";
import '../i18n';


export default function App(
    {Component, pageProps}: AppProps) {
    return (
        <React.Fragment>
            <Toaster/>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </React.Fragment>
    )
}
