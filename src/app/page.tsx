import FeaturesSection from "@/components/landing/Features"
import Header from "@/components/landing/Header"
import Steps from "@/components/landing/Steps"
import WhoItsForSection from "@/components/landing/WhoItsFor"

function Home() {
    return (
        <article>
            <Header />
            <Steps />
            <FeaturesSection />
            <WhoItsForSection />
        </article>
    )
}

export default Home
