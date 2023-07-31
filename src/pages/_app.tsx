import StyledComponentsRegistry from "../styled-registry";
import {createGlobalStyle} from "styled-components"
import {AppProps} from "next/app";
import {createTheme, NextUIProvider} from '@nextui-org/react'
import {Toaster} from "react-hot-toast";
import React from "react";
import '../i18n';

const StyledGlobal = createGlobalStyle`
  html, body, #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  div[data-overlay-container] {
    width: 100%;
    height: 100%;
  }
`
const theme = createTheme({type: "dark"})

export default function App(
    {Component, pageProps}: AppProps) {
    return (
        <StyledComponentsRegistry>
            <StyledGlobal/>
            <Toaster/>
            <NextUIProvider theme={theme}>
                <Component {...pageProps} />
            </NextUIProvider>
        </StyledComponentsRegistry>
    )
}
