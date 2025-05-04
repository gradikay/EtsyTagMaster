import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, Copy, Download, Zap, HelpCircle, Sparkles } from "lucide-react";

interface GenerateTagsRequest {
  description: string;
  category: string;
  style?: string;
}

interface GenerateTagsResponse {
  tags: string[];
  relevanceScore: number;
}

const Home = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const { toast } = useToast();

  const generateTags = useMutation({
    mutationFn: async (data: GenerateTagsRequest) => {
      const response = await apiRequest("POST", "/api/generate-tags", data);
      return response.json() as Promise<GenerateTagsResponse>;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product description first.",
        variant: "destructive",
      });
      return;
    }

    generateTags.mutate({
      description,
      category,
      style: style || undefined,
    });
  };

  const handleCopyTags = () => {
    if (generateTags.data) {
      const tagsText = generateTags.data.tags.join(", ");
      navigator.clipboard.writeText(tagsText).then(() => {
        toast({
          title: "Success",
          description: "Tags copied to clipboard!",
        });
      });
    }
  };

  const handleExportCSV = () => {
    if (generateTags.data) {
      const tagsCSV = generateTags.data.tags.join(",");
      const blob = new Blob([tagsCSV], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "etsy-tags.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast({
        title: "Success",
        description: "Tags exported as CSV!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tag className="text-primary h-6 w-6" />
            <span className="font-bold text-xl">TagGen</span>
          </div>
          <a 
            href="https://help.etsy.com/hc/en-us/articles/115015663987-How-to-Tag-Items-and-Use-Attributes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-slate-300 hover:text-primary transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            Etsy Tags Help
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Etsy Tag Generator
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Create optimized tags for your Etsy listings in seconds. Enter your product description below to generate relevant keywords.
            </p>
          </div>

          {/* Generator Form */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-xl p-6 backdrop-blur-sm mb-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="product-description" className="block text-sm font-medium text-slate-300 mb-2">
                  Product Description
                </label>
                <Textarea 
                  id="product-description" 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
                  placeholder="Example: Handmade ceramic mug with custom name, personalized gift for coffee lovers, birthday present"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label htmlFor="product-category" className="block text-sm font-medium text-slate-300 mb-2">
                    Category (Optional)
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full px-4 py-6 bg-slate-700/50 border border-slate-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border border-slate-700 text-white">
                      <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                      <SelectItem value="clothing">Clothing & Shoes</SelectItem>
                      <SelectItem value="home">Home & Living</SelectItem>
                      <SelectItem value="wedding">Wedding & Party</SelectItem>
                      <SelectItem value="toys">Toys & Entertainment</SelectItem>
                      <SelectItem value="art">Art & Collectibles</SelectItem>
                      <SelectItem value="craft">Craft Supplies</SelectItem>
                      <SelectItem value="gifts">Gifts & Gift Cards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label htmlFor="product-style" className="block text-sm font-medium text-slate-300 mb-2">
                    Style/Theme (Optional)
                  </label>
                  <Input
                    type="text"
                    id="product-style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-6 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    placeholder="E.g. Minimalist, Vintage, Boho"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-opacity shadow-lg text-white px-6 py-6" 
                  disabled={generateTags.isPending}
                  size="lg"
                >
                  {generateTags.isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Tags
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {generateTags.isSuccess && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-xl p-6 backdrop-blur-sm animate-fade-in" id="results-area">
              <h3 className="font-bold text-xl mb-4 text-white flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Your Optimized Etsy Tags
              </h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-300">Relevance Score</span>
                  <span className="text-sm font-bold text-primary">{generateTags.data.relevanceScore}/100</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <Progress value={generateTags.data.relevanceScore} className="h-full bg-gradient-to-r from-primary to-blue-500" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6" id="generated-tags">
                {generateTags.data.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-slate-700/50 hover:bg-slate-700 text-white border-slate-600 px-3 py-1.5 text-sm font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleCopyTags}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All Tags
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border border-slate-600 bg-slate-700/50 hover:bg-slate-700 text-white"
                  onClick={handleExportCSV}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
              </div>
            </div>
          )}

          {generateTags.isError && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 p-5 rounded-lg animate-fade-in">
              <p className="font-medium">Error generating tags</p>
              <p className="text-sm">Please try again with a different description or check your connection.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TagGen. Not affiliated with Etsy, Inc. | Created for personal use only</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;