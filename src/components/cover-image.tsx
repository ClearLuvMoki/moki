import Image from "next/image"
import { Info, LocateIcon } from "lucide-react"
import { siteConfig } from "@/config/site"

interface CoverImageProps {
    src: string
    alt: string
}

export default function CoverImage({ src, alt }: CoverImageProps) {
    return (
        <figure>
            <div className="relative mb-12 w-full">
                <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1080}
                    placeholder="blur"
                    blurDataURL={src}
                    className="rounded-8 aspect-[16/9] animate-reveal rounded-xl object-cover"
                    priority
                />

                <div className="absolute bottom-0 left-0 right-0 flex gap-4 rounded-b-xl p-3 backdrop-blur-sm">
                    <div className="h-28 w-28">
                    </div>

                    <div className="flex flex-col justify-between py-2 text-white">
                        <span className="text-xl font-semibold">{siteConfig.author.name}</span>

                        {/* <div className="flex items-center gap-1">
                            <LocateIcon size={16} />
                            <span className="text-sm">{siteConfig.author.location}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Info size={16} />
                            <span className="text-sm">28 years old</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </figure>
    )
}
