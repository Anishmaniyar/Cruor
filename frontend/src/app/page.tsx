import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import DonorSection from "@/components/landing/DonorSection";
import HospitalSection from "@/components/landing/HospitalSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <DonorSection />
      <HospitalSection />
      <Footer />
    </main>
  );
}
