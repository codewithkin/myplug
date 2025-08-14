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
            <ChatComponent chatBotId="08c27729-7c85-4781-ac2a-5f8e6030b724" chatBotName="MyPlug" website="https://myplug.ai" apiKey="myplug_iCfPRVBNpGKXUMGxWFhFGRxPiIPHArWZfUVndcFTuNFwlCXEPHMEkYJEFWnqLJIa" />
            <Steps />
            <FeaturesSection />
            <WhoItsForSection />
            <CtaSection />
            <Footer />
        </article>
    )
}

export default Home
