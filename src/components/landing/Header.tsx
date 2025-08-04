"use client"

import { CircleFadingPlus, Loader2, PenTool, Sparkles } from "lucide-react"
import { Badge } from "../ui/badge"
import NavBar from "./shared/nav-bar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { motion } from "framer-motion"
import EmailInput from "./EmailInput"

function Header() {

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="min-h-screen w-full bg-[#020617] relative dark:flex flex-col items-center py-16 hidden">
                {/* Magenta Orb Grid Background */}
                <div
                    className="absolute inset-0 z-0 "
                    style={{
                        background: "#020617",
                        backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
                        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                    }}
                />

                <NavBar />

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col gap-8 mt-8 justify-center items-center text-center z-10"
                >
                    <Badge className="px-4 py-2 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-600 rounded-full bg-white text-slate-600 dark:text-white font-normal shadow-md">
                        <CircleFadingPlus />
                        AI chatbots for your site
                    </Badge>

                    <article className="flex flex-col gap-8 md:max-w-2xl">
                        <h2 className="text-6xl font-semibold">Add an AI chatbot to your site</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            Easily integrate intelligent assistants into your web platform to boost customer engagement, improve service, and enhance automation.
                        </p>

                        <EmailInput />

                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            Upgrade your website to match the 21st century
                        </p>
                    </article>
                </motion.article>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="min-h-screen w-full bg-[#020617] relative flex flex-col items-center py-12 dark:hidden">
                {/* White Sphere Grid Background */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "white",
                        backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
                        backgroundSize: "32px 32px, 32px 32px, 100% 100%",
                    }}
                />
                <NavBar />

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col gap-8 mt-8 justify-center items-center text-center z-10"
                >
                    <Badge className="px-4 py-2 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-600 rounded-full bg-white text-slate-600 dark:text-white font-normal shadow-md">
                        <CircleFadingPlus />
                        AI chatbots for your site
                    </Badge>

                    <article className="flex flex-col gap-8 md:max-w-2xl">
                        <h2 className="text-6xl font-semibold">Add an AI chatbot to your site</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-600">
                            Easily integrate intelligent assistants into your web platform to boost customer engagement, improve service, and enhance automation.
                        </p>

                        <EmailInput />

                        <p className="text-sm text-gray-600 dark:text-slate-600">
                            Upgrade your website to match the 21st century
                        </p>
                    </article>
                </motion.article>
            </motion.div>
        </>
    )
}

export default Header