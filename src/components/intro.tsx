"use client"
import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"

const Intro = () => {
    return (
        <section className="-mt-10 min-h-[calc(100vh-80px)] scroll-mt-[100rem]  flex flex-col justify-center space-y-4  sm:mb-0">
            <motion.div
                className="mb-10 mt-4 flex flex-col gap-y-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="font-bold leading-[1.5] sm:text-xl lg:text-3xl">
                    {siteConfig?.author?.name}
                </span>
                <span className="lg:text-xl sm:text-md font-semibold text-muted-foreground">
                    Moonquakes
                </span>
            </motion.div>

            <motion.div
                className="flex flex-col gap-2 text-lg font-medium sm:flex-row"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.1,
                }}
            >
                {/* <Link
                    href="#contact"
                    className={cn(buttonVariants({ variant: "default" }), "group")}
                >
                    Contact me
                    <Icons.arrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Link> */}

                <Link
                    href={siteConfig.links.github}
                    aria-label="github"
                    target="_blank"
                    className={cn(buttonVariants({ variant: "outline" }), "group")}
                >
                    Github
                    <Icons.github className="ml-2 h-4 w-4 " />
                </Link>
            </motion.div>
        </section>
    )
}

export default Intro
