"use client";

import { Video } from "lucide-react";
import Link from "next/link";
import QuickStartSteps from "./quickStartSteps";

export default function QuickStart() {
  
    return (
        <article className="flex shadow-md w-full border rounded-xl border-blue-500 dark:border-slate-700 flex-col items-center w-full p-4 justify-center gap-4">
            <article className="w-full flex items-center justify-between">
            <h2 className="text-lg font-semibold">Let's get you started</h2>

            <Link href="#" className="flex gap-2 text-blue-500 dark:text-slate-700 font-semibold items-center">
                <Video size={16} strokeWidth={2} />

                <p className="text-sm">Watch tutorials</p>
            </Link>
            </article>

           <QuickStartSteps />
        </article>
    )
}