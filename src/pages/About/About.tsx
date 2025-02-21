import Hero from "./components/Hero";
import Mission from "./components/Mission";
import OurStory from "./components/OurStory";
import VisitUs from "./components/VisitUs";
import WhyChooseUs from "./components/WhyChooseUs";

export default function About() {
  return (
    <div className="mb-10">
      <Hero />
      <OurStory />
      <WhyChooseUs />
      <Mission />
      <VisitUs/>
    </div>
  )
}
