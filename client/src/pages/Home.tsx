import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TryNow from "../components/TryNow";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Features />
      <TryNow />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
