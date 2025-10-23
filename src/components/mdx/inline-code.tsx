import { cn } from "@/lib/utils"

const InlineCode = ({ children }: { children: React.ReactNode }) => {
    if (children && Array.isArray(children)) {
        return <>
            {children}
        </>
    }
    return <code className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        "text-foreground/90 dark:text-foreground/90",
        "before:content-none after:content-none break-all mx-1",
    )}>
        {children}
    </code>
}

export default InlineCode