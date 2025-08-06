import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Keys",
    description: "Your MyPlug API Keys"
}

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex overflow-y-hidden md:flex-row flex-col">
            <Sidebar />
            {children}
        </main>
    )
}