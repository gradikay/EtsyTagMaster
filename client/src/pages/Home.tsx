import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Sparkles, RefreshCcw, Link as LinkIcon, Copy, Moon, Sun,
  GemIcon, ShirtIcon, HomeIcon, PaintbrushIcon, UmbrellaIcon, ScissorsIcon, 
  GamepadIcon, Clock8Icon, InfoIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface GenerateTagsRequest {
  description: string;
  category: string;
  style?: string;
  maxTags?: number;
  maxWordsPerTag?: number;
}

interface GenerateTagsResponse {
  tags: string[];
  relevanceScore: number;
  totalAvailableTags: number;
  totalFilteredTags: number;
}

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  style: z.string().optional(),
  maxTags: z.number().min(1).max(200).default(13),
  maxWordsPerTag: z.number().min(1).max(5).default(3),
});

export default function Home() {
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [relevanceScore, setRelevanceScore] = useState<number>(0);
  const [, setLocation] = useLocation();
  
  // Add custom style for select dropdown in light mode
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* CRITICAL: Force white background for select dropdown content in light mode */
      body.light-mode div[data-radix-popper-content-wrapper] > div,
      body.light-mode div[data-radix-popper-content-wrapper] [role="listbox"],
      body.light-mode div[data-radix-popper-content-wrapper] [role="presentation"],
      body.light-mode [data-radix-select-content],
      body.light-mode [data-radix-select-viewport],
      body.light-mode [data-radix-select-item] {
        background-color: white !important;
        color: #1e293b !important;
      }
      
      /* Very specific override to make sure this takes effect */
      body.light-mode .SelectContent.light-mode-select.bg-slate-700 {
        background-color: white !important;
      }
      
      /* Target any dropdown item */
      body.light-mode div[data-radix-popper-content-wrapper] [role="option"] {
        background-color: white !important;
        color: #1e293b !important;
      }
      
      /* Target highlighted/selected select items */
      body.light-mode [data-radix-select-item][data-highlighted],
      body.light-mode [data-radix-select-item][data-state="checked"],
      body.light-mode div[data-radix-popper-content-wrapper] [role="option"][data-highlighted] {
        background-color: #818cf8 !important;
        color: white !important;
      }
      
      /* Target any element with select-item class */
      body.light-mode .SelectItem {
        color: #1e293b !important;
        background-color: white !important;
      }
      
      /* Add proper borders and shadows */
      body.light-mode div[data-radix-popper-content-wrapper] > div {
        border: 1px solid rgba(147, 197, 253, 0.4) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Ensure proper hover states */
      body.light-mode [data-radix-select-item]:hover {
        background-color: #e2e8f0 !important;
        color: #1e293b !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      style: "",
      maxTags: 13,
      maxWordsPerTag: 3,
    },
  });
  
  // Parse URL parameters when the component loads
  useEffect(() => {
    // Get URL search params
    const params = new URLSearchParams(window.location.search);
    const sharedTags = params.get('tags');
    const sharedScore = params.get('score');
    
    // If there are shared tags in the URL, update the state
    if (sharedTags) {
      try {
        const decodedTags = JSON.parse(decodeURIComponent(sharedTags));
        if (Array.isArray(decodedTags) && decodedTags.length > 0) {
          setTags(decodedTags);
          
          // Set the relevance score if available
          if (sharedScore) {
            const score = parseFloat(sharedScore);
            if (!isNaN(score)) {
              setRelevanceScore(score);
            }
          }
          
          // Show a toast notification
          toast({
            title: "Shared tags loaded",
            description: `Loaded ${decodedTags.length} shared tags`,
          });
        }
      } catch (e) {
        console.error("Error parsing shared tags:", e);
      }
    }
  }, [toast]);

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
      setRelevanceScore(data.relevanceScore);
      
      // Update URL with the generated tags for sharing
      // NOTE: No limitation on the number of tags
      const tagsParam = encodeURIComponent(JSON.stringify(data.tags));
      const scoreParam = data.relevanceScore.toString();
      const newUrl = `?tags=${tagsParam}&score=${scoreParam}`;
      window.history.pushState(null, '', newUrl);
      
      console.log(`Generated ${data.tags.length} tags`); // Log the actual count of tags
      
      // Create a more descriptive success message
      const tagCount = data.tags.length;
      const totalAvailableTags = data.totalAvailableTags || tagCount;
      const totalFilteredTags = data.totalFilteredTags || tagCount;
      
      // Calculate messages for the toast
      const extraTagsMessage = totalFilteredTags > tagCount 
        ? ` (${totalFilteredTags - tagCount} more available with your settings)` 
        : '';
      
      const wordLimitMessage = totalAvailableTags > totalFilteredTags 
        ? ` (${totalAvailableTags - totalFilteredTags} filtered by word limit)` 
        : '';
        
      const etsy13Message = tagCount > 13 
        ? ` - ${tagCount - 13} extra beyond Etsy's 13-tag limit!` 
        : '';
      
      toast({
        title: "Tags generated successfully!",
        description: `Generated ${tagCount} tags${extraTagsMessage}${wordLimitMessage}${etsy13Message} with a relevance score of ${data.relevanceScore}/99`,
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
    <div className="min-h-screen text-white main-container">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-12">
        {/* Header - More responsive text sizing */}
        <header className="relative mb-8 sm:mb-12 animate-fade-in">
          <div className="absolute top-1 right-2 sm:top-0 sm:right-2 flex items-center gap-2 z-20">
            <div className="flex items-center gap-2 p-2 bg-slate-800/70 rounded-full mode-toggle-bg">
              <Sun className="h-4 w-4 text-yellow-400" />
              <Switch 
                id="dark-mode" 
                className="data-[state=checked]:bg-primary"
                onCheckedChange={(checked) => {
                  // Dark mode is already active by default
                  document.documentElement.classList.toggle('light-mode', !checked);
                  document.body.classList.toggle('light-mode', !checked);
                  
                  // With animated background, we don't need to set explicit background colors
                  // The mode change will be detected by our AnimatedBackground component
                }}
                defaultChecked={true}
              />
              <Moon className="h-4 w-4 text-slate-300" />
            </div>
          </div>
          
          <div className="text-center pt-8 sm:pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
              Etsy SEO Tag Generator
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Create optimal tags for your Etsy listings and boost your shop's visibility
            </p>
          </div>
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 touch-scroll">
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
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/70 border-slate-600 h-12 text-base">
                                <SelectValue placeholder="Select category">
                                  {field.value && (
                                    <div className="flex items-center gap-2">
                                      {field.value === "jewelry" && <GemIcon className="w-4 h-4 text-indigo-400" />}
                                      {field.value === "clothing" && <ShirtIcon className="w-4 h-4 text-blue-400" />}
                                      {field.value === "home_decor" && <HomeIcon className="w-4 h-4 text-emerald-400" />}
                                      {field.value === "art" && <PaintbrushIcon className="w-4 h-4 text-pink-400" />}
                                      {field.value === "accessories" && <UmbrellaIcon className="w-4 h-4 text-yellow-400" />}
                                      {field.value === "craft_supplies" && <ScissorsIcon className="w-4 h-4 text-red-400" />}
                                      {field.value === "toys_games" && <GamepadIcon className="w-4 h-4 text-purple-400" />}
                                      {field.value === "vintage" && <Clock8Icon className="w-4 h-4 text-amber-400" />}
                                      <span>
                                        {field.value === "jewelry" && "Jewelry"}
                                        {field.value === "clothing" && "Clothing"}
                                        {field.value === "home_decor" && "Home Decor"}
                                        {field.value === "art" && "Art"}
                                        {field.value === "accessories" && "Accessories"}
                                        {field.value === "craft_supplies" && "Craft Supplies"}
                                        {field.value === "toys_games" && "Toys & Games"}
                                        {field.value === "vintage" && "Vintage"}
                                      </span>
                                    </div>
                                  )}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent 
                              className="light-mode-select bg-slate-700 border-slate-600 text-white text-base SelectContent">
                              <SelectItem value="jewelry" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <GemIcon className="w-4 h-4 text-indigo-400" />
                                  <span>Jewelry</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="clothing" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <ShirtIcon className="w-4 h-4 text-blue-400" />
                                  <span>Clothing</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="home_decor" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <HomeIcon className="w-4 h-4 text-emerald-400" />
                                  <span>Home Decor</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="art" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <PaintbrushIcon className="w-4 h-4 text-pink-400" />
                                  <span>Art</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="accessories" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <UmbrellaIcon className="w-4 h-4 text-yellow-400" />
                                  <span>Accessories</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="craft_supplies" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <ScissorsIcon className="w-4 h-4 text-red-400" />
                                  <span>Craft Supplies</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="toys_games" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <GamepadIcon className="w-4 h-4 text-purple-400" />
                                  <span>Toys & Games</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="vintage" className="flex items-center">
                                <div className="flex items-center gap-2">
                                  <Clock8Icon className="w-4 h-4 text-amber-400" />
                                  <span>Vintage</span>
                                </div>
                              </SelectItem>
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="maxTags"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-sm sm:text-base">Number of Tags (Default: 13)</FormLabel>
                            <span className="text-sm text-slate-300">{field.value} tags</span>
                          </div>
                          <FormControl>
                            <Slider 
                              defaultValue={[field.value]} 
                              max={100} 
                              min={1} 
                              step={1}
                              onValueChange={(vals: number[]) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-slate-400">
                            Etsy allows up to 13 tags per listing, but you can generate more to choose from
                          </FormDescription>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="maxWordsPerTag"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-sm sm:text-base">Max Words Per Tag</FormLabel>
                            <span className="text-sm text-slate-300">{field.value} {field.value === 1 ? 'word' : 'words'}</span>
                          </div>
                          <FormControl>
                            <Slider 
                              defaultValue={[field.value]} 
                              max={5} 
                              min={1} 
                              step={1}
                              onValueChange={(vals: number[]) => field.onChange(vals[0])}
                              className="py-4"
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-slate-400">
                            Limit tag length - choose 1 for single words, up to 5 for longer phrases
                          </FormDescription>
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
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Generated Tags</h2>
                
                {relevanceScore > 0 && (
                  <div className="flex items-center gap-1.5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 bg-indigo-900/50 px-3 py-1 rounded-full text-sm cursor-help">
                            <span className="font-medium">Score: {relevanceScore}/99</span>
                            <InfoIcon className="h-4 w-4 text-indigo-300" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-slate-800 border-slate-700 text-white p-3">
                          <p className="font-medium mb-1">Relevance Score: 99/99</p>
                          <p className="text-sm">All generated tags are perfectly matched to your product description and optimized for maximum Etsy SEO effectiveness.</p>
                          <p className="text-xs mt-2 text-green-400">
                            Our advanced algorithm ensures that only the most relevant keywords are selected for your product listings.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
              
              {tags.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-slate-400">
                  <p>Your generated tags will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Tags"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 sm:gap-3 max-h-[350px] overflow-y-auto p-1 sm:p-2 tag-container">
                    {tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        onClick={(e) => {
                          const target = e.currentTarget;
                          
                          // Add temporary visual feedback
                          target.classList.add("tag-copied");
                          
                          // Copy tag to clipboard
                          navigator.clipboard.writeText(tag)
                            .then(() => {
                              // Show more prominent visual indicator of success
                              const originalContent = target.innerHTML;
                              target.innerHTML = `<span style="display:flex;align-items:center;justify-content:center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!</span>`;
                              
                              // Reset after 1.5 seconds
                              setTimeout(() => {
                                target.innerHTML = originalContent;
                                target.classList.remove("tag-copied");
                              }, 1500);
                              
                              // Still show toast notification
                              toast({
                                title: "Tag copied!",
                                description: `"${tag}" copied to clipboard`
                              });
                            })
                            .catch(() => {
                              target.classList.remove("tag-copied");
                              toast({
                                title: "Copy failed",
                                description: "Could not copy tag to clipboard",
                                variant: "destructive"
                              });
                            });
                        }}
                        className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-white border border-slate-700 px-3 py-2 sm:py-1.5 text-sm sm:text-sm touch-manipulation cursor-pointer active:scale-95 transition-all copy-tag-badge"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Result actions: Copy tags and share link buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 px-4 touch-manipulation w-full sm:w-auto active:scale-95 transition-transform"
                      onClick={(e) => {
                        const button = e.currentTarget;
                        const originalContent = button.innerHTML;
                        
                        // Add visual indication that copying is in progress
                        button.innerHTML = `<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Copying...</span>`;
                        
                        navigator.clipboard.writeText(tags.join(', '))
                          .then(() => {
                            // Change to success state
                            button.innerHTML = `<span class="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!</span>`;
                            
                            toast({
                              title: "Tags copied!",
                              description: "All tags copied to clipboard"
                            });
                            
                            // Reset button after 2 seconds
                            setTimeout(() => {
                              button.innerHTML = originalContent;
                            }, 2000);
                          })
                          .catch(() => {
                            // Change to error state
                            button.innerHTML = `<span class="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-red-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Error</span>`;
                            
                            toast({
                              title: "Copy failed",
                              description: "Could not copy to clipboard",
                              variant: "destructive"
                            });
                            
                            // Reset button after 2 seconds
                            setTimeout(() => {
                              button.innerHTML = originalContent;
                            }, 2000);
                          });
                      }}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy All Tags
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 px-4 touch-manipulation w-full sm:w-auto active:scale-95 transition-transform"
                      onClick={(e) => {
                        const button = e.currentTarget;
                        const originalContent = button.innerHTML;
                        
                        // Add visual indication that copying is in progress
                        button.innerHTML = `<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Copying...</span>`;
                        
                        // Get the current URL with query parameters
                        const shareableUrl = window.location.href;
                        
                        // Copy to clipboard
                        navigator.clipboard.writeText(shareableUrl)
                          .then(() => {
                            // Change to success state
                            button.innerHTML = `<span class="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!</span>`;
                            
                            toast({
                              title: "Shareable link copied!",
                              description: "Link to these tags has been copied to clipboard"
                            });
                            
                            // Reset button after 2 seconds
                            setTimeout(() => {
                              button.innerHTML = originalContent;
                            }, 2000);
                          })
                          .catch(() => {
                            // Change to error state
                            button.innerHTML = `<span class="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-red-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Error</span>`;
                            
                            toast({
                              title: "Copy failed",
                              description: "Could not copy link to clipboard",
                              variant: "destructive"
                            });
                            
                            // Reset button after 2 seconds
                            setTimeout(() => {
                              button.innerHTML = originalContent;
                            }, 2000);
                          });
                      }}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" /> Copy Shareable Link
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    
                    {/* Check if we're viewing shared tags */}
                    {window.location.search.includes('tags=') && (
                      <div className="mb-3 p-2 bg-blue-900/20 border border-blue-800/30 rounded-md">
                        <p className="text-sm text-blue-300 flex items-center">
                          <LinkIcon className="h-3 w-3 mr-1" /> 
                          You're viewing shared tags. Generate your own by using the form.
                        </p>
                      </div>
                    )}
                    
                    <p className="text-sm text-slate-400">
                      <span className="font-medium text-primary-foreground">Showing {tags.length} tags</span> from your description. Etsy allows a maximum of 13 tags per listing.
                    </p>
                    {generateTagsMutation.data && generateTagsMutation.data.totalFilteredTags !== undefined && generateTagsMutation.data.totalFilteredTags > tags.length && (
                      <p className="text-xs text-amber-400 mt-1">
                        <span className="font-medium">Info:</span> {generateTagsMutation.data.totalFilteredTags - tags.length} more tags available. Adjust the "Number of Tags" slider to see more.
                      </p>
                    )}
                    {generateTagsMutation.data && generateTagsMutation.data.totalAvailableTags !== undefined && generateTagsMutation.data.totalFilteredTags !== undefined && generateTagsMutation.data.totalAvailableTags > generateTagsMutation.data.totalFilteredTags && (
                      <p className="text-xs text-blue-400 mt-1">
                        <span className="font-medium">Note:</span> {generateTagsMutation.data.totalAvailableTags - generateTagsMutation.data.totalFilteredTags} tags were filtered by your {form.getValues().maxWordsPerTag} word limit. Adjust the "Max Words Per Tag" slider to see more.
                      </p>
                    )}
                    {tags.length > 13 && (
                      <p className="text-xs text-amber-400 mt-1">
                        <span className="font-medium">Note:</span> You'll need to choose your favorite 13 tags for your Etsy listing.
                      </p>
                    )}
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