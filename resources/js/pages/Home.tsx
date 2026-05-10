import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import SectorCards from "../components/SectorCards";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import FloatingContact from "../components/FloatingContact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <SectorCards />
        <HowItWorks />
        <WhyChooseUs />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}