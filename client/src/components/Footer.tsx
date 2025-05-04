import { Tag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="text-primary h-6 w-6" />
              <span className="font-bold text-xl">EtsyTagPro</span>
            </div>
            <p className="text-white text-opacity-80">
              A simple tag generator for Etsy listings
            </p>
          </div>

          <div className="flex space-x-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white text-opacity-80 hover:text-primary transition">Features</a></li>
                <li><a href="#how-it-works" className="text-white text-opacity-80 hover:text-primary transition">How It Works</a></li>
                <li><a href="#try-now" className="text-white text-opacity-80 hover:text-primary transition">Generate Tags</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-white text-opacity-60 text-sm">
          <p>&copy; {new Date().getFullYear()} EtsyTagPro. All rights reserved. Not affiliated with Etsy, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
