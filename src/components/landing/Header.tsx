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

function Header() {
    const [joined, setJoined] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { mutate: joinWaitlist, isPending: joiningWaitlist } = useMutation({
        mutationKey: ["joinWaitlist"],
        mutationFn: async () => {
            const res = await axios.post("/api/waitlist")

            if (res.status === 200) {
                toast("Thanks for signing up", {
                    description: "Please check your email for a confirmation message"
                })
                setJoined(true)
            }

            return res.data
        },
        onError: () => {
            setError("An error occurred while joining the waitlist.")
        }
    })

    return (
        <motion.header
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center py-12 bg-gray-100 dark:bg-slate-900 min-h-screen"
        >
            <NavBar />

            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col gap-8 mt-8 justify-center items-center text-center"
            >
                <Badge className="px-4 py-2 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-600 rounded-full bg-white text-slate-600 dark:text-white font-normal shadow-md">
                    <CircleFadingPlus />
                    AI chatbots for your site
                </Badge>

                <article className="flex flex-col gap-8 md:max-w-2xl">
                    <h2 className="text-6xl font-semibold">Add an AI chatbot to your site</h2>
                    <p className="text-sm text-gray-400 dark:text-slate-600">
                        Easily integrate intelligent assistants into your web platform to boost customer engagement, improve service, and enhance automation.
                    </p>

                    {joined ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            You're on the list! We'll be in touch soon.
                        </motion.div>
                    ) : (
                        <motion.article
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-2 self-center md:max-w-lg rounded-full bg-gray-200 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 py-2 px-4"
                        >
                            <Input
                                className="shadow-none border-0 outline-0 focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0 bg-transparent"
                                placeholder="Your email"
                            />
                            <Button
                                className="rounded-full py-6 px-4"
                                disabled={joiningWaitlist}
                                onClick={() => joinWaitlist()}
                            >
                                {joiningWaitlist ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <PenTool className="mr-2 h-4 w-4" />
                                        Join waitlist
                                    </>
                                )}
                            </Button>
                        </motion.article>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 font-medium">
                            {error}
                        </p>
                    )}

                    <p className="text-sm text-gray-400 dark:text-slate-600">
                        Upgrade your website to match the 21st century
                    </p>
                </article>
            </motion.article>
        </motion.header>
    )
}

export default Header