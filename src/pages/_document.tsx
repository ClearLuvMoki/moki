import React from "react";
import Document, {Html, Head, Main, NextScript} from "next/document";

class AppDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles]),
        };
    }

    render() {
        return (
            <Html lang="en">
                <body>]
                <main className="dark ">
                    <Main/>
                    <NextScript/>
                </main>
                </body>
            </Html>
        );
    }
}

export default AppDocument;