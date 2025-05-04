import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tag className="text-primary h-6 w-6" />
          <span className="font-bold text-xl text-secondary">EtsyTagPro</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium text-secondary hover:text-primary transition">Features</a>
          <a href="#how-it-works" className="font-medium text-secondary hover:text-primary transition">How It Works</a>
          <a href="#try-now" className="font-medium text-secondary hover:text-primary transition">Try It</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#try-now" className="hidden md:block text-sm font-semibold bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition">Generate Tags</a>
          <button 
            className="md:hidden text-secondary"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white pb-4 border-t border-gray-100`}>
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <a 
            href="#features" 
            className="py-2 font-medium text-secondary hover:text-primary transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="py-2 font-medium text-secondary hover:text-primary transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <Button 
            asChild
            className="w-full bg-primary text-white hover:bg-primary/90"
            onClick={() => setMobileMenuOpen(false)}
          >
            <a href="#try-now">Try Now</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
