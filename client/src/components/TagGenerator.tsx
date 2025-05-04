import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Zap, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Interfaces for the API request and response
interface GenerateTagsRequest {
  description: string;
  category: string;
  style?: string;
}

interface GenerateTagsResponse {
  tags: string[];
  relevanceScore: number;
}

const TagGenerator = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const { toast } = useToast();

  const generateTags = useMutation({
    mutationFn: async (data: GenerateTagsRequest) => {
      const response = await apiRequest({
        method: "POST", 
        url: "/api/generate-tags", 
        body: data
      });
      return response as GenerateTagsResponse;
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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
              Your Product Description or Title
            </label>
            <Textarea 
              id="product-description" 
              rows={4} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              placeholder="Example: Handmade ceramic mug with custom name, personalized gift for coffee lovers, birthday present"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full px-4 py-6">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
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
              <label htmlFor="product-style" className="block text-sm font-medium text-gray-700 mb-2">
                Style/Theme (Optional)
              </label>
              <Input
                type="text"
                id="product-style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="E.g. Minimalist, Vintage, Boho"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="bg-primary text-white hover:bg-primary/90" 
              disabled={generateTags.isPending}
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
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Tags
                </>
              )}
            </Button>
          </div>
        </form>

        {generateTags.isSuccess && (
          <div className="mt-8" id="results-area">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-xl mb-4 text-secondary">Your Optimized Etsy Tags</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Keyword Relevance Score</span>
                  <span className="text-sm font-bold text-success">{generateTags.data.relevanceScore}/100</span>
                </div>
                <Progress value={generateTags.data.relevanceScore} className="h-2.5 bg-gray-200" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6" id="generated-tags">
                {generateTags.data.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="tag bg-primary/10 text-primary border-none px-3 py-1.5 text-sm font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-secondary text-white hover:bg-secondary/90"
                  onClick={handleCopyTags}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All Tags
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border border-gray-300 bg-white text-secondary hover:bg-gray-50"
                  onClick={handleExportCSV}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
              </div>

              <div className="mt-6 bg-accent bg-opacity-10 rounded-lg p-4">
                <div className="flex items-start">
                  <Lightbulb className="text-accent mt-1 mr-3 h-5 w-5" />
                  <div>
                    <h4 className="font-semibold text-secondary">Pro Tip</h4>
                    <p className="text-sm text-neutral-dark">
                      These tags work best when your product title also includes your top 3-5 keywords.
                      Try using more detailed descriptions for even better results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {generateTags.isError && (
          <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-lg">
            <p className="font-medium">Error generating tags</p>
            <p className="text-sm">Please try again or contact support if the issue persists.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagGenerator;
