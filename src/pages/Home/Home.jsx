import Hero from "./Sections/Hero";
import TopScholarships from "./Sections/TopScholarships";
import ScholarshipCategories from "./Sections/ScholarshipCategories";
import WhyChooseUs from "./Sections/WhyChooseUs";
import Testimonials from "./Sections/Testimonials";
import FAQ from "./Sections/FAQ";
import FinalCTA from "./Sections/FinalCTA";

const Home = () => {
  return (
    <div className="bg-base-100">
      <Hero />
      <TopScholarships />
      <ScholarshipCategories />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default Home;
