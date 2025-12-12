import BenefitsSection from "@/components/landing/benefits-section";
import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="">
        <Navbar/>
        <Hero/>
        <Features/>
        {/* <BenefitsSection/> */}
        <HowItWorksSection/>
        <CTA/>
        <Footer/> 
      </main>
    </div>
  );
}