import QuickStart from "./quickstart";

export default function WelcomePage() {
    return (
        <section className="flex md:overflow-y-scroll w-full flex-col mx-auto p-4 md:h-screen">
            <QuickStart />
        </section>
    )
}