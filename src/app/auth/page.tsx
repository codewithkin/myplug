"use client";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle, Mail } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthPage() {
    const [email, setEmail] = useState("");

    const { mutate: signInWithEmail, isPending: signingInWithEmail } = useMutation({
        mutationFn: async (email: string) => {
            const { data, error } = await authClient.signIn.magicLink({
                email,
                callbackURL: "/dashboard",
                newUserCallbackURL: "/welcome",
            });
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            toast.success("Success !", {
                description: "Please check your email for a link to sign in",
            });
        },
        onError: () => {
            toast.error("Failed to sign in");
        },
    });

    const { mutate: signInWithGoogle, isPending: signingInWithGoogle } = useMutation({
        mutationFn: async () => {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
                newUserCallbackURL: "/welcome",
            });
            if (error) throw new Error(error.message);
            return data;
        },
        onError: () => {
            toast.error("Failed to sign in");
        },
    });

    const { mutate: signInWithGitHub, isPending: signingInWithGitHub } = useMutation({
        mutationFn: async () => {
            const { data, error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
                newUserCallbackURL: "/welcome",
            });
            if (error) throw new Error(error.message);
            return data;
        },
        onError: () => {
            toast.error("Failed to sign in");
        },
    });

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-4 justify-center h-screen max-w-md mx-auto"
        >
            {process.env.NODE_ENV === "development" && <ModeToggle />}

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold"
            >
                Welcome to <span className="text-blue-500">My</span>Plug. <br />
                <span className="text-gray-400 dark:text-slate-600">
                    Easy AI chatbots
                </span>
            </motion.h2>

            <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 w-full justify-center items-center"
            >
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-2 mt-10 w-full max-w-md"
                >
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        disabled={signingInWithEmail}
                        size="lg"
                        className="bg-blue-500 hover:bg-blue-700"
                        onClick={() => signInWithEmail(email)}
                    >
                        {signingInWithEmail ? (
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                            <Mail className="w-4 h-4" />
                        )}
                        {signingInWithEmail
                            ? "Signing in with email..."
                            : "Sign in with email"}
                    </Button>
                </motion.article>

                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <p className="text-gray-400 dark:text-slate-600 text-xl font-semibold">or</p>
                </motion.article>

                <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-2 w-full md:w-fit"
                >
                    <Button
                        disabled={signingInWithGoogle}
                        size="lg"
                        variant="outline"
                        className="w-full md:w-fit"
                        onClick={() => signInWithGoogle()}
                    >
                        {signingInWithGoogle ? (
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                            <Image src="/icons/google.png" alt="Google" width={20} height={20} />
                        )}
                        {signingInWithGoogle
                            ? "Signing in with Google..."
                            : "Sign in with Google"}
                    </Button>
                    <Button
                        disabled={signingInWithGitHub}
                        size="lg"
                        variant="outline"
                        className="w-full md:w-fit bg-slate-500 text-white hover:bg-slate-500/80 dark:bg-slate-500 dark:hover:bg-slate-500/80 hover:text-white"
                        onClick={() => signInWithGitHub()}
                    >
                        {signingInWithGitHub ? (
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                            <Image src="/icons/github.png" alt="GitHub" width={20} height={20} />
                        )}
                        {signingInWithGitHub
                            ? "Signing in with GitHub..."
                            : "Sign in with GitHub"}
                    </Button>
                </motion.article>
            </motion.article>
        </motion.section>
    );
}