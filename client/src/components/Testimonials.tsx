import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  business: string;
  content: string;
  rating: number;
}

const Testimonial = ({ name, business, content, rating }: TestimonialProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-custom hover:shadow-lg transition">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-secondary">{name}</h4>
            <p className="text-sm text-neutral-dark">{business}</p>
          </div>
        </div>
        <p className="text-neutral-dark mb-4">{content}</p>
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-current' : ''}`} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-secondary mb-4">What Etsy Sellers Say</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">Join thousands of sellers who have increased their shop visibility and sales with our tag generator.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial 
            name="Sarah Johnson"
            business="Handmade Jewelry Shop"
            content="After struggling to get my jewelry noticed, I tried EtsyTagPro and saw a 78% increase in shop traffic within just 3 weeks. The seasonal keyword suggestions were especially helpful for my holiday collections."
            rating={5}
          />
          
          <Testimonial 
            name="Michael Rodriguez"
            business="Custom Print Shop"
            content="I was spending hours researching keywords for my print shop. This tool does it in seconds and generates better results than I could find manually. My conversion rate has doubled!"
            rating={4.5}
          />
          
          <Testimonial 
            name="Emily Chen"
            business="Home Decor & Textiles"
            content="As a new Etsy seller, I had no idea how to make my products visible. The tag generator helped me understand what my customers are actually searching for. Worth every penny!"
            rating={5}
          />
        </div>

        <Card className="mt-12 shadow-custom">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <Avatar className="w-40 h-40 border-4 border-primary">
                  <AvatarFallback className="text-4xl">JW</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-full md:w-2/3 md:pl-8">
                <p className="text-xl italic text-neutral-dark mb-6">
                  "I went from 5-10 sales per month to over 60 sales monthly after implementing the tags from EtsyTagPro. The difference was immediate and dramatic. The Pro plan's competition analysis feature helped me find untapped niches in my category."
                </p>
                <div>
                  <h4 className="font-semibold text-lg text-secondary">Jessica Watkins</h4>
                  <p className="text-neutral-dark">
                    Vintage Clothing Shop | <span className="text-primary font-medium">200% Revenue Increase</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;
