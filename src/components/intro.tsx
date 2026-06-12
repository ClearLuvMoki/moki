"use client"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useLocale } from "@/components/providers/locale-provider"
import { siteConfig } from "@/config/site"

const Intro = () => {
    const { dict } = useLocale()
    const [showScrollHint, setShowScrollHint] = useState(true)
    const scrollHintDismissed = useRef(false)

    const scrollToBlogs = () => {
        scrollHintDismissed.current = true
        setShowScrollHint(false)
        document.getElementById("recent-blogs")?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual"
        }
        if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname + window.location.search)
        }
        window.scrollTo(0, 0)

        const handleScroll = () => {
            if (scrollHintDismissed.current) return
            setShowScrollHint(window.scrollY < 48)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="relative -mt-10 flex h-[calc(100dvh-3rem)] shrink-0 flex-col justify-center space-y-4 sm:h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)]">
            <motion.div
                className="mb-10 mt-4 flex flex-col gap-y-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="font-bold leading-[1.5] sm:text-2xl lg:text-3xl">
                    {siteConfig?.author?.name}
                </span>
                <span className="text-md font-semibold text-muted-foreground">
                    {siteConfig.description}
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
                    {dict.home.github}
                    <Icons.github className="ml-2 h-4 w-4 " />
                </Link>
            </motion.div>

            <AnimatePresence>
                {showScrollHint && (
                    <motion.button
                        type="button"
                        onClick={scrollToBlogs}
                        aria-label={dict.home.scrollHint}
                        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.span
                            className="absolute h-8 w-8 rounded-full bg-muted-foreground/20 blur-md"
                            animate={{
                                opacity: [0.2, 0.7, 0.2],
                                scale: [0.85, 1.15, 0.85],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.span
                            animate={{
                                opacity: [0.4, 1, 0.4],
                                y: [0, 6, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Icons.chevronDown className="relative h-6 w-6 text-muted-foreground" />
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Intro
