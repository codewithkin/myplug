import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Welcome to MyPlug",
    description: "Welcome to MyPlug, let's get you started",
}

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex overflow-y-hidden md:flex-row flex-col">
            <Sidebar />
            {children}
        </main>
    )
}