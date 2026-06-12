import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Separator } from "../ui/separator";

const Footer = () => {
    return (
        <footer className="border-t ">
            <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0 m-auto">
                <div className="text-center text-[11px] md:text-sm leading-loose md:text-left flex items-center ">
                    <Link
                        href="https://beian.miit.gov.cn"
                        title="蜀ICP备2024095311号"
                    >
                        <span className="text-default-600 text-small">蜀ICP备2024095311号&nbsp;&nbsp;</span>
                    </Link>
                    {/* <Separator orientation="vertical" className="!h-3 mx-2 w-1 bg-zinc-100" /> */}
                    Copyright © 2019-2024&nbsp;
                    <a
                        href={siteConfig.links.mail}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                    >
                        {siteConfig.name}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
