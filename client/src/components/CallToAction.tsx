import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to Boost Your Etsy Shop Visibility?</h2>
        <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto mb-8">
          Join thousands of successful sellers who are using optimized tags to increase their traffic and sales.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-white text-primary hover:bg-white/90">
            <a href="#try-now">Try for Free</a>
          </Button>
          <Button asChild variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/10">
            <a href="#pricing">View Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
