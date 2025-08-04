import FeaturesSection from "@/components/landing/Features"
import Header from "@/components/landing/Header"
import Steps from "@/components/landing/Steps"
import WhoItsForSection from "@/components/landing/WhoItsFor"
import CtaSection from "@/components/landing/CTA"

function Home() {
    return (
        <article>
            <Header />
            <Steps />
            <FeaturesSection />
            <WhoItsForSection />
            <CtaSection />
        </article>
    )
}

export default Home
