"use client";

import FeaturesSection from "@/components/landing/Features"
import Header from "@/components/landing/Header"
import Steps from "@/components/landing/Steps"
import WhoItsForSection from "@/components/landing/WhoItsFor"
import CtaSection from "@/components/landing/CTA"
import Footer from "@/components/landing/shared/footer"
import { ChatComponent } from "myplug-ai"

function Home() {
    return (
        <article>
            <Header />
            <ChatComponent
                chatBotId={process.env.NEXT_PUBLIC_CHATBOT_ID}
                chatBotName={process.env.NEXT_PUBLIC_CHATBOT_NAME}
                website={process.env.NEXT_PUBLIC_WEBSITE}
                apiKey={process.env.NEXT_PUBLIC_MYPLUG_API_KEY} />
            <Steps />
            <FeaturesSection />
            <WhoItsForSection />
            <CtaSection />
            <Footer />
        </article>
    )
}

export default Home
