"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { BookOpenText, Gem, Home, UsersRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { motion } from "framer-motion"

export type Navlink = {
    title: string
    href: string
    icon: ReactNode
}

const containerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
}

const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

function NavBar() {
    const pathname = usePathname()

    const links: Navlink[] = [
        {
            title: "Home",
            href: "/home",
            icon: <Home />,
        },
        {
            title: "Pricing",
            href: "/pricing",
            icon: <Gem />,
        },
        {
            title: "About",
            href: "/about",
            icon: <BookOpenText />,
        },
        {
            title: "Team",
            href: "/team",
            icon: <UsersRound />,
        },
    ]

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="shadow-md dark:bg-white bg-slate-900 rounded-full w-full md:w-fit flex justify-between gap-4 md:gap-12 items-center py-4 px-8"
        >
            <motion.h1
                variants={itemVariants}
                className="text-xl font-bold dark:text-slate-900 text-white hidden md:inline-flex"
            >
                <span className="text-blue-500 dark:text-blue-700">My</span>Plug
            </motion.h1>

            <motion.article className="flex items-center gap-2 md:gap-4 w-full md:w-fit justify-between">
                {links.map((link: Navlink, index: number) => {
                    const isActive = pathname === link.href

                    return (
                        <motion.div key={index} variants={itemVariants}>
                            <Link
                                href={link.href}
                                className={`font-semibold transition duration-300 ${isActive
                                    ? "text-blue-500 dark:text-blue-700 underline underline-offset-4"
                                    : "text-white dark:text-slate-900 hover:text-blue-500 dark:hover:text-blue-700"
                                    }`}
                            >
                                <span className="hidden md:inline-flex">{link.title}</span>
                                <article className="flex flex-col justify-center items-center md:hidden">
                                    <span className={`${isActive ? "text-blue-500 dark:text-blue-700" : ""}`}>
                                        {link.icon}
                                    </span>
                                    <span className={`${isActive ? "font-bold" : ""}`}>{link.title}</span>
                                </article>
                            </Link>
                        </motion.div>
                    )
                })}
            </motion.article>

            <motion.div variants={itemVariants}>
                <ModeToggle />
            </motion.div>
        </motion.nav>
    )
}

export default NavBar