"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, PenTool, Sparkles } from "lucide-react"

function EmailInput() {
    const [email, setEmail] = useState("")
    const [joined, setJoined] = useState(false)

    const { mutate: joinWaitlist, isPending: joiningWaitlist } = useMutation({
        mutationKey: ["joinWaitlist"],
        mutationFn: async () => {
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error("Please enter a valid email address.")
            }

            const res = await axios.post("/api/waitlist", { email })

            if (res.status === 200) {
                return res.data
            }

            throw new Error("Failed to join the waitlist.")
        },
        onSuccess: () => {
            setJoined(true)
            toast("Thanks for signing up!", {
                description: "Please check your email for a confirmation message.",
            })
        },
        onError: (err: any) => {
            toast.error("An error occurred while joining the waitlist.", {
                description: "Please check your email and try again"
            })
        },
    })

    if (joined) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-4 rounded-full font-medium flex items-center justify-center gap-2"
            >
                <Sparkles className="w-5 h-5" />
                You're on the list! We'll be in touch soon.
            </motion.div>
        )
    }

    return (
        <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 self-center md:max-w-lg rounded-full bg-gray-200 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 py-2 px-4"
        >
            <Input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                className="shadow-none border-0 outline-0 focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0 bg-transparent"
                placeholder="Your email"
            />
            <Button
                className="rounded-full py-6 px-4"
                disabled={joiningWaitlist}
                onClick={() => joinWaitlist()}
            >
                {joiningWaitlist ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining waitlist...
                    </>
                ) : (
                    <>
                        <PenTool className="mr-2 h-4 w-4" />
                        Join waitlist
                    </>
                )}
            </Button>
        </motion.article>
    )
}

export default EmailInput