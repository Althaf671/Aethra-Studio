import Hero from "./components/homeComponents/HeroSection";
import Testimonial from "./components/homeComponents/TestimonialSection";
import CatalogSection from "./components/homeComponents/CatalogSection";
import IntroSection from "./components/homeComponents/IntroSection";


export default function Home() {
  return (
    <div className="container mx-auto flex flex-col flex-wrap gap-3 -z-50 overflow-x-hidden text-white">
      <Hero />
      <Testimonial />
      <CatalogSection />
      <IntroSection/>
    </div>
  );
}