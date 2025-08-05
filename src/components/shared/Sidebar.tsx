"use client";
import { Home, KeySquare, Settings } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type SidebarLink = {
    icon: ReactNode,
    name: string,
    href: string
}

export default function Sidebar () {
    // TODO: ADD other links
    const sidebarLinks: SidebarLink[] = [
        {
            icon: <Home />,
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            icon: <Settings />,
            name: "Settings",
            href: "/settings"
        },
        {
            icon: <KeySquare />,
            name: "API Keys",
            href: "/api-keys"
        },
    ]

    const currentPath = usePathname();

    return (
        <>
            {/* Desktop sidebar */}
            <article className="hidden gap-8 dark:bg-slate-900 bg-slate-200 md:flex md:flex-col items-center min-h-screen w-fit px-4 py-12">
                {/* TODO: Add Shadcn Avatar */}

                <article className="flex flex-col gap-4">
                    <TooltipProvider>
                        {
                            sidebarLinks.map((link: SidebarLink, index: number) => {
                                const pathNameIncluded = currentPath.includes(link.href);

                                return (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={pathNameIncluded ? "default" : "outline"} className={``} asChild>
                                                <Link href={link.href}>
                                                    {link.icon}
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            {link.name}
                                        </TooltipContent>
                                    </Tooltip>
                                )
                            })
                        }
                    </TooltipProvider>
                </article>

                {/* TODO: Add secondary links */}
            </article>
        </>
    )
}