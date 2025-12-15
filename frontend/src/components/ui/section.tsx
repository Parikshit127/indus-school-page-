import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-8 md:py-24 px-4 md:px-8 container mx-auto", className)}
            {...props}
        >
            {children}
        </section>
    );
}
