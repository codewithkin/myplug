import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in to MyPlug",
    description: "Sign in to your MyPlug account",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}