import BenefitsSection from "@/components/landing/benefits-section";
import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-rose-50">
      <main className="">
        <Hero/>
        <Features/>
        <BenefitsSection/>
        <HowItWorksSection/>
        <CTA/>
        <Footer/> 
      </main>
    </div>
  );
}