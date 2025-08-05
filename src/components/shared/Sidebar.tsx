"use client";
import { Home, KeySquare, Menu, Settings } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

type SidebarLink = {
    icon: ReactNode,
    name: string,
    href: string
}

function MobileAppSidebarContent () {
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
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle className="font-bold text-xl"><span className="text-blue-500">My</span>Plug</SheetTitle>
            </SheetHeader>

            <article className="p-4">
                  {/* TODO: Add Shadcn Avatar */}

                  <article className="flex flex-col gap-4">
                        {
                            sidebarLinks.map((link: SidebarLink, index: number) => {
                                const pathNameIncluded = currentPath.includes(link.href);

                                return (
                                    <Button key={index} variant={pathNameIncluded ? "default" : "outline"} className={``} asChild>
                                        <Link href={link.href}>
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    </Button>
                                )
                            })
                        }
                </article>

                {/* TODO: Add secondary links */}
            </article>
        </SheetContent>
    )
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
                                    <Tooltip key={index}>
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

            {/* Mobile navbar */}
            <article className="w-full dark:bg-slate-900 bg-slate-200 p-4 flex items-center justify-between md:hidden">
                <article className="flex gap-2 items-center">
                    <Sheet>
                        <SheetTrigger>
                            <Menu strokeWidth={1.8} size={24} />
                        </SheetTrigger>

                        <MobileAppSidebarContent />
                    </Sheet>
                    <h2 className="text-xl font-bold"><span className="text-blue-500">My</span>Plug</h2>
                </article>
            </article>
        </>
    )
}