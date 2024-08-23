import {Html, Head, Main, NextScript} from 'next/document'
import {Link} from "@nextui-org/link";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="author"
                    content="徐牧之啊;ClearLuvMoki"
                    key="author"
                />
                <meta
                    name="desc"
                    content="徐牧之啊的个人主页"
                    key="desc"
                />
            </Head>
            <body
                className={"min-h-screen bg-background font-sans antialiased "}
            >
            <Main/>
            <NextScript/>
            </body>
            <footer className="w-full flex flex-col items-center justify-center py-3 text-small text-default-600">
                <Link
                    isExternal
                    href="https://beian.miit.gov.cn"
                    title="蜀ICP备2024095311号"
                >
                    <span className="text-default-600 text-small">蜀ICP备2024095311号</span>
                </Link>
                <div>
                    Copyright © 2019-20 ZkSky. | All Rights Reserved.
                </div>
            </footer>
        </Html>
    )
}
