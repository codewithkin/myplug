"use client";

import FeaturesSection from "@/components/landing/Features"
import Header from "@/components/landing/Header"
import Steps from "@/components/landing/Steps"
import WhoItsForSection from "@/components/landing/WhoItsFor"
import CtaSection from "@/components/landing/CTA"
import Footer from "@/components/landing/shared/footer"
import {ChatComponent} from "myplug"

function Home() {
    return (
        <article>
            <Header />
            <ChatComponent 
                chatBotId="b157e965-8d03-4e19-ab4f-e0710c6e16d2" 
                chatBotName="MyPlug" 
                website="https://myplug.ai" 
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
