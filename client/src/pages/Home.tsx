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
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
            Etsy SEO Tag Generator
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Create optimal tags for your Etsy listings and boost your shop's visibility
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tag Generator Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 shadow-lg glass-effect animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Sparkles className="text-primary mr-2 h-5 w-5" />
                Generate Your Tags
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product in detail..."
                            className="bg-slate-800/70 border-slate-600 min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/70 border-slate-600">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-600">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Style (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Bohemian, Minimalist, Vintage"
                              className="bg-slate-800/70 border-slate-600"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={generateTagsMutation.isPending}
                    className="w-full py-6 text-lg font-medium relative overflow-hidden group animate-border-glow"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-[2px] bg-slate-900 rounded-[4px]"></span>
                    <span className="relative flex items-center justify-center">
                      {generateTagsMutation.isPending ? (
                        <>
                          <RefreshCcw className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Tags
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg h-full glass-effect animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Generated Tags</h2>
              
              {tags.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p>Your generated tags will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Tags"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white border border-slate-700 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
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