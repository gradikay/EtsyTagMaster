import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Boost Your Etsy Sales with <span className="text-yellow-200">Optimized Tags</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white text-opacity-90">
              Our AI-powered tag generator creates high-converting keywords specifically for Etsy's algorithm. Get more visibility, clicks, and sales for your shop.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <a href="#try-now">Try for Free</a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <p className="ml-4 text-sm">
                <span className="font-bold">2,500+</span> Etsy sellers trust our tool
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <div className="bg-white rounded-xl shadow-xl p-6 transform rotate-1 hover:rotate-0 transition duration-300">
              <div className="w-full h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">handmade jewelry</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">unique gifts</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">boho earrings</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">christmas gift idea</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-none">+9 more</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
