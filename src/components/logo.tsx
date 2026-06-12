import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <span className="font-mono text-lg font-bold">{`${siteConfig.name}`}</span>
        </Link>
    )
}

export default Logo
