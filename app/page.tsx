import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Showcase from "@/components/Showcase";
import Pricing from "@/components/Pricing";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Showcase />
        <Pricing />
        <ComingSoon />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
