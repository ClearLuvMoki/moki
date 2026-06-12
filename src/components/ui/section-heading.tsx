import { cn } from "@/lib/utils"

type SectionHeadingProps = {
    children: React.ReactNode
    className?: string
}

export default function SectionHeading({ children, className }: SectionHeadingProps) {
    return (
        <h2
            className={cn(
                "mb-8 text-center font-heading text-3xl font-medium capitalize",
                className,
            )}
        >
            {children}
        </h2>
    )
}
