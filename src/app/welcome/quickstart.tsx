"use client";

import { FastForward, Video } from "lucide-react";
import Link from "next/link";
import QuickStartSteps from "./quickStartSteps";
import { Button } from "@/components/ui/button";

export default function QuickStart() {
  
    return (
        <article className="flex shadow-md w-full border rounded-xl border-slate-400 dark:border-slate-700 flex-col items-center w-full p-4 justify-center gap-4">
            <article className="w-full flex md:flex-row flex-col gap-2 items-center justify-between">
                <h2 className="text-lg font-semibold">Let's get you started</h2>

                <article className="flex items-center gap-2 md:gap-4">
                    <Button asChild variant="outline" className="">
                        <Link href="#" className="flex gap-2 dark:text-white font-semibold items-center">
                            <Video size={16} strokeWidth={2} />

                            <p className="text-sm">Tutorials</p>
                        </Link>
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900" asChild>
                        <Link href="/dashboard" className="flex gap-2 text-white font-semibold items-center">
                            <FastForward size={16} strokeWidth={2} />

                            <p className="text-sm">Skip</p>
                        </Link>
                    </Button>
                </article>
            </article>

           <QuickStartSteps />
        </article>
    )
}