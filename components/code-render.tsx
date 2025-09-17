import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {tomorrow, oneLight} from "react-syntax-highlighter/dist/cjs/styles/prism"
import clx from "clsx";
import {useTheme} from "next-themes";

interface Props {
    type: "inline" | "block";
    language: string;
    children: string;
}

const CodeRender = ({type, language, children}: Props) => {
    const {theme} = useTheme();

    return (
        <div className={clx({
            "moki-inline-code": type === "inline",
            "rounded-md overflow-hidden my-2": type === "block",
            "inline-flex rounded-md text-sm px-2 bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-white": type === "inline"
        })}>
            {
                type === "block" && (
                    <div className="flex justify-between items-center px-4 py-1 font-bold bg-zinc-300 dark:bg-zinc-600 ">
                        <span className="select-none">{language || "plaintext"}</span>
                    </div>
                )
            }
            <SyntaxHighlighter
                showInlineLineNumbers={true}
                language={language}
                style={theme === "dark" ? tomorrow : oneLight}
                customStyle={{
                    margin: 0
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeRender;
