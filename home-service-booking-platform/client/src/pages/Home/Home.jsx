import Hero from "../../components/home/Hero";
import ServicesPreview from "../../components/home/ServicesPreview";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import HowItWorks from "../../components/home/HowItWorks";
import CTA from "../../components/home/CTA";

function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <HowItWorks />
      <CTA />
    </>
  );
}

export default Home;