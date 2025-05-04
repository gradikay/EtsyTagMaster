import { Search, TrendingUp, Zap, Lightbulb, Bell, History } from "lucide-react";

const Feature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-neutral-light rounded-xl p-6 shadow-custom hover:shadow-lg transition">
      <div className="w-12 h-12 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-3 text-secondary">{title}</h3>
      <p className="text-neutral-dark">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-secondary mb-4">Why Choose Our Etsy Tag Generator?</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">Get the perfect mix of high-traffic and niche keywords to make your listings stand out in Etsy's search results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<Search className="text-accent text-xl" />}
            title="Etsy-Specific Algorithm"
            description="Our tags are optimized specifically for Etsy's search engine, not generic SEO tools that don't understand the platform."
          />
          
          <Feature 
            icon={<TrendingUp className="text-primary text-xl" />}
            title="Real-Time Trending Keywords"
            description="Stay ahead with tags based on current search trends and seasonal buyer behaviors on Etsy."
          />
          
          <Feature 
            icon={<Zap className="text-success text-xl" />}
            title="One-Click Implementation"
            description="Copy all generated tags with a single click and paste directly into your Etsy listings. No manual typing needed."
          />
          
          <Feature 
            icon={<Lightbulb className="text-accent text-xl" />}
            title="Long-Tail Keyword Suggestions"
            description="Discover high-converting long-tail keywords that have less competition but serious buyer intent."
          />
          
          <Feature 
            icon={<Bell className="text-primary text-xl" />}
            title="Seasonal Tag Updates"
            description="Get notifications when it's time to update your tags for upcoming holidays or seasonal shopping trends."
          />
          
          <Feature 
            icon={<History className="text-success text-xl" />}
            title="Tag Performance Tracking"
            description="See which tags are bringing you the most traffic and sales, with suggestions for improving underperforming listings."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
