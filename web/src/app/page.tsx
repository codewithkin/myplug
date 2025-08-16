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
                chatBotId="e364b28b-ee21-4dd7-abe6-cdf9dad037ed" 
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
