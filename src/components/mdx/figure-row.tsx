"use client"

import ImageZoom from "@/components/image-zoom"
import { cn } from "@/lib/utils"

export interface FigureRowItem {
    src: string
    alt: string
}

interface FigureRowProps {
    items: FigureRowItem[]
    className?: string
}

const FigureRow = ({ items, className }: FigureRowProps) => {
    if (items.length === 0) return null

    return (
        <div
            className={cn("my-6 grid w-full gap-2 sm:gap-3", className)}
            style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
            {items.map((item) => (
                <ImageZoom key={item.src}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border bg-muted/20 sm:aspect-video">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="absolute inset-0 size-full cursor-zoom-in object-cover"
                            loading="lazy"
                        />
                    </div>
                </ImageZoom>
            ))}
        </div>
    )
}

export default FigureRow
