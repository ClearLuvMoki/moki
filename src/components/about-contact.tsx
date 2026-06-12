import { Mail } from "lucide-react"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"

export default function AboutContact() {
    return (
        <div className="flex flex-col-reverse gap-12 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-3">
                <p>
                    {`Please do not hesitate to contact me if you have any queries or are interested in working with me!`}
                </p>
                <span>{"There are several ways to contact it:"}</span>
                <div className="mt-3 flex items-center gap-4">
                    <a
                        className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                        target="_blank"
                        href={`mailto:${siteConfig.links.mail}`}
                    >
                        <Mail size={18} />
                        <span>Mail</span>
                    </a>

                    <a
                        className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                        target="_blank"
                        href={siteConfig.links.github}
                    >
                        <Icons.github className="size-5" />
                        <span>Github</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
