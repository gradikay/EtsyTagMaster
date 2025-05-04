import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const PricingFeature = ({ available, text }: { available: boolean, text: string }) => {
  return (
    <li className="flex items-start">
      {available ? (
        <Check className="text-success mt-1 mr-2 h-4 w-4" />
      ) : (
        <X className="text-gray-400 mt-1 mr-2 h-4 w-4" />
      )}
      <span className={available ? '' : 'text-gray-400'}>{text}</span>
    </li>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-secondary mb-4">Simple, Transparent Pricing</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">Choose the plan that fits your Etsy shop size and needs. All plans include our core tag generation technology.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-custom border-t-4 border-gray-300 hover:shadow-lg transition flex flex-col h-full">
            <h3 className="font-semibold text-xl mb-2 text-secondary">Free</h3>
            <p className="text-neutral-dark mb-6">Perfect for new shops or occasional use</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">$0</span>
              <span className="text-neutral-dark">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <PricingFeature available={true} text="5 tag generations per month" />
              <PricingFeature available={true} text="Basic keyword suggestions" />
              <PricingFeature available={true} text="Copy tags to clipboard" />
              <PricingFeature available={false} text="No seasonal trend data" />
              <PricingFeature available={false} text="No competitor analysis" />
            </ul>
            <Button asChild variant="outline" className="w-full bg-gray-200 text-secondary hover:bg-gray-300">
              <a href="#try-now">Get Started</a>
            </Button>
          </div>

          {/* Standard Plan */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-xl border-t-4 border-primary transform scale-105 z-10 flex flex-col h-full relative">
            <div className="absolute -top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="font-semibold text-xl mb-2 text-secondary">Standard</h3>
            <p className="text-neutral-dark mb-6">For growing Etsy shops with regular listings</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">$14.99</span>
              <span className="text-neutral-dark">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <PricingFeature available={true} text="Unlimited tag generations" />
              <PricingFeature available={true} text="Advanced keyword suggestions" />
              <PricingFeature available={true} text="Seasonal trend recommendations" />
              <PricingFeature available={true} text="Basic competitor analysis" />
              <PricingFeature available={true} text="CSV/spreadsheet export" />
            </ul>
            <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
              <a href="#">Start 7-Day Free Trial</a>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-custom border-t-4 border-secondary hover:shadow-lg transition flex flex-col h-full">
            <h3 className="font-semibold text-xl mb-2 text-secondary">Pro</h3>
            <p className="text-neutral-dark mb-6">For serious sellers with multiple listings</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-secondary">$29.99</span>
              <span className="text-neutral-dark">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <PricingFeature available={true} text="Everything in Standard" />
              <PricingFeature available={true} text="Deep competitor tag analysis" />
              <PricingFeature available={true} text="Bulk tag generation (up to 20 listings at once)" />
              <PricingFeature available={true} text="Performance tracking dashboard" />
              <PricingFeature available={true} text="Priority email support" />
            </ul>
            <Button asChild className="w-full bg-secondary text-white hover:bg-secondary/90">
              <a href="#">Start 7-Day Free Trial</a>
            </Button>
          </div>
        </div>

        <Card className="mt-12 bg-gray-100 max-w-3xl mx-auto">
          <CardContent className="p-6">
            <h4 className="font-semibold text-center text-secondary mb-4">Frequently Asked Questions</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-secondary mb-2">Can I cancel my subscription anytime?</h5>
                <p className="text-sm text-neutral-dark">Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.</p>
              </div>
              <div>
                <h5 className="font-medium text-secondary mb-2">How do I know if the tags are working?</h5>
                <p className="text-sm text-neutral-dark">Standard and Pro plans include analytics that show your visibility improvements. You should see changes in your Etsy Stats dashboard within 2-3 weeks.</p>
              </div>
              <div>
                <h5 className="font-medium text-secondary mb-2">Is there a limit to how many listings I can optimize?</h5>
                <p className="text-sm text-neutral-dark">Free plan allows 5 listings per month. Standard has unlimited individual generations. Pro adds bulk processing of up to 20 listings simultaneously.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Pricing;
