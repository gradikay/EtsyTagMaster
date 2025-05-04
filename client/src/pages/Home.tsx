import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Sparkles, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";

interface GenerateTagsRequest {
  description: string;
  category: string;
  style?: string;
}

interface GenerateTagsResponse {
  tags: string[];
  relevanceScore: number;
}

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  style: z.string().optional(),
});

export default function Home() {
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      style: "",
    },
  });

  const generateTagsMutation = useMutation({
    mutationFn: async (data: GenerateTagsRequest) => {
      const response = await apiRequest({
        method: "POST",
        url: "/api/generate-tags",
        body: data,
      });
      return response as GenerateTagsResponse;
    },
    onSuccess: (data) => {
      setTags(data.tags);
      toast({
        title: "Tags generated successfully!",
        description: `Generated ${data.tags.length} tags with a relevance score of ${data.relevanceScore.toFixed(1)}/10`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error generating tags",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating tags:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    generateTagsMutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-12">
        {/* Header - More responsive text sizing */}
        <header className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
            Etsy SEO Tag Generator
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Create optimal tags for your Etsy listings and boost your shop's visibility
          </p>
        </header>

        {/* Mobile-first grid system with order changes on larger screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Tag Generator Form */}
          <div className="lg:col-span-2 order-1">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 mb-5 sm:mb-8 shadow-lg glass-effect animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                <Sparkles className="text-primary mr-2 h-5 w-5" />
                Generate Your Tags
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product in detail..."
                            className="bg-slate-800/70 border-slate-600 min-h-[100px] sm:min-h-[120px] text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/70 border-slate-600 h-12 text-base">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-600 text-base">
                              <SelectItem value="jewelry">Jewelry</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="home_decor">Home Decor</SelectItem>
                              <SelectItem value="art">Art</SelectItem>
                              <SelectItem value="accessories">Accessories</SelectItem>
                              <SelectItem value="craft_supplies">Craft Supplies</SelectItem>
                              <SelectItem value="toys_games">Toys & Games</SelectItem>
                              <SelectItem value="vintage">Vintage</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Style (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Bohemian, Minimalist, Vintage"
                              className="bg-slate-800/70 border-slate-600 h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                    <Button 
                      type="submit" 
                      disabled={generateTagsMutation.isPending}
                      className="py-4 sm:py-6 px-8 sm:px-10 text-base sm:text-lg font-medium relative flash-button text-white touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {generateTagsMutation.isPending ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Generate Tags
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Results Section - On mobile it's below the form, on desktop it's alongside */}
          <div className="lg:col-span-1 order-2">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 shadow-lg h-full glass-effect animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Generated Tags</h2>
              
              {tags.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-slate-400">
                  <p>Your generated tags will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Tags"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white border border-slate-700 px-3 py-1.5 text-sm touch-manipulation"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Copy tags button for mobile convenience */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 px-4 touch-manipulation w-full sm:w-auto"
                      onClick={() => {
                        navigator.clipboard.writeText(tags.join(', '))
                          .then(() => {
                            toast({
                              title: "Tags copied!",
                              description: "All tags copied to clipboard"
                            });
                          })
                          .catch(() => {
                            toast({
                              title: "Copy failed",
                              description: "Could not copy to clipboard",
                              variant: "destructive"
                            });
                          });
                      }}
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" /> Copy All Tags
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400">
                      You can use up to 13 tags per Etsy listing. Choose the most relevant ones for your product.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}