import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-secondary mb-4">How EtsyTagPro Works</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">Our advanced algorithm analyzes millions of successful Etsy listings to generate the most effective tags for your products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-custom">
            <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">1</div>
            <h3 className="font-semibold text-xl mb-3 text-secondary">Enter Your Product Details</h3>
            <p className="text-neutral-dark mb-4">Simply paste your product description or title. The more detailed, the better your results will be.</p>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-custom">
            <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">2</div>
            <h3 className="font-semibold text-xl mb-3 text-secondary">Our AI Analyzes the Market</h3>
            <p className="text-neutral-dark mb-4">Our algorithm checks current Etsy search trends, competition levels, and buyer behavior patterns.</p>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-neutral-light rounded-xl p-6 shadow-custom">
            <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">3</div>
            <h3 className="font-semibold text-xl mb-3 text-secondary">Get Optimized Tags Instantly</h3>
            <p className="text-neutral-dark mb-4">Receive a perfectly balanced mix of high-volume and niche keywords ready to copy into your Etsy listings.</p>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <Card className="mt-16 shadow-custom">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className="font-semibold text-2xl mb-4 text-secondary">The Science Behind Our Tags</h3>
                <p className="text-neutral-dark mb-4">Our algorithm doesn't just generate random keywords - it's trained on data from millions of successful Etsy listings to understand what actually converts to sales.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-success mt-1 mr-2 h-5 w-5" />
                    <span>Analyzes current search trends on Etsy</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-success mt-1 mr-2 h-5 w-5" />
                    <span>Identifies keyword gaps your competitors are missing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-success mt-1 mr-2 h-5 w-5" />
                    <span>Balances high-traffic terms with conversion-focused long-tail keywords</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-success mt-1 mr-2 h-5 w-5" />
                    <span>Updates recommendations based on seasonal buying patterns</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
