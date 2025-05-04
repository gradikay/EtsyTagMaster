import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Schema for tag generation request
const generateTagsSchema = z.object({
  description: z.string().min(1, "Product description is required"),
  category: z.string().optional(),
  style: z.string().optional(),
});

// Helper function to generate SEO tags based on description
function generateTags(description: string, category?: string, style?: string): string[] {
  // Convert description to lowercase for easier processing
  const lowerDesc = description.toLowerCase();
  
  // Extract potential keywords from description
  const words = lowerDesc.split(/\s+/);
  const phrases = [];
  
  // Extract single words (excluding common words)
  const commonWords = ['a', 'the', 'and', 'or', 'but', 'for', 'with', 'in', 'on', 'at', 'to', 'of', 'is', 'are', 'was', 'were', 'be', 'this', 'that', 'these', 'those', 'it', 'they', 'them', 'their', 'there', 'here', 'when', 'where', 'why', 'how', 'which', 'who', 'whom'];
  // Get all meaningful single words
  const singleWords = words.filter(word => !commonWords.includes(word) && word.length > 3);
  
  // Extract more aggressive word combinations to get more tags:
  
  // 2-word phrases (all combinations)
  for (let i = 0; i < words.length - 1; i++) {
    if (!commonWords.includes(words[i]) && words[i].length > 2) {
      // Create more 2-word phrases with adjacent words
      phrases.push(`${words[i]} ${words[i+1]}`);
    }
  }
  
  // 3-word phrases
  for (let i = 0; i < words.length - 2; i++) {
    if (!commonWords.includes(words[i]) && words[i].length > 2) {
      phrases.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
    }
  }
  
  // Key phrases extraction - look for descriptive combinations
  const descriptiveWords = ['handmade', 'custom', 'unique', 'vintage', 'artisan', 'natural', 'organic', 'eco', 'rustic', 'modern', 'bohemian', 'minimalist', 'colorful', 'wooden', 'ceramic', 'metal', 'leather', 'cotton', 'glass', 'beaded', 'recycled', 'sustainable', 'personalized'];
  
  // Find descriptive words in the text and create combinations
  descriptiveWords.forEach(descriptive => {
    if (lowerDesc.includes(descriptive)) {
      // Add combinations with significant nouns from the description
      singleWords.forEach(word => {
        if (word.length > 3 && !commonWords.includes(word)) {
          phrases.push(`${descriptive} ${word}`);
        }
      });
    }
  });
  
  // Combine all potential keywords
  let potentialTags = [...singleWords, ...phrases];
  
  // Add category-specific tags
  const categoryTags: Record<string, string[]> = {
    jewelry: ['handmade jewelry', 'custom jewelry', 'unique jewelry', 'jewelry gift', 'statement piece'],
    clothing: ['handmade clothing', 'custom apparel', 'unique clothing', 'fashion gift', 'boutique clothing'],
    home_decor: ['home decor', 'handmade decor', 'custom home gift', 'interior design', 'home accent'],
    art: ['original art', 'handmade art', 'wall art', 'custom artwork', 'unique art'],
    accessories: ['handmade accessories', 'custom accessories', 'fashion accessory', 'unique accessory'],
    craft_supplies: ['craft supplies', 'crafting materials', 'art supplies', 'diy materials', 'crafting tools'],
    toys_games: ['handmade toys', 'custom game', 'unique toy', 'kids gift', 'educational toy'],
    vintage: ['vintage item', 'retro find', 'antique gift', 'collectible', 'nostalgic gift']
  };
  
  // Add category and category-specific tags if provided
  if (category && categoryTags[category]) {
    potentialTags.push(category);
    potentialTags.push(`${category} gift`);
    // Add all category-specific tags
    potentialTags = [...potentialTags, ...categoryTags[category]];
  }
  
  // Add style-related tags if provided
  if (style) {
    potentialTags.push(style);
    potentialTags.push(`${style} ${category || 'item'}`);
    potentialTags.push(`${style} design`);
    potentialTags.push(`${style} style`);
  }
  
  // Add material-related tags if detected in description
  const materials = ['wood', 'wooden', 'metal', 'ceramic', 'glass', 'cotton', 'linen', 'silk', 'leather', 'paper', 'plastic', 'stone', 'silver', 'gold', 'brass', 'copper', 'steel', 'bronze', 'iron', 'clay', 'porcelain', 'fabric', 'wool', 'acrylic', 'resin'];
  
  for (const material of materials) {
    if (lowerDesc.includes(material)) {
      potentialTags.push(material);
      potentialTags.push(`${material} ${category || 'item'}`);
      potentialTags.push(`${material} gift`);
      break; // Only add one material to avoid tag redundancy
    }
  }
  
  // Add occasion-related tags if detected in description
  const occasions = ['wedding', 'birthday', 'anniversary', 'christmas', 'holiday', 'halloween', 'thanksgiving', 'easter', 'mothers day', 'fathers day', 'valentines', 'graduation', 'baby shower', 'retirement', 'housewarming'];
  
  for (const occasion of occasions) {
    if (lowerDesc.includes(occasion) || lowerDesc.includes(occasion.replace(' ', ''))) {
      potentialTags.push(`${occasion} gift`);
      potentialTags.push(`${occasion} present`);
      break; // Only add one occasion to avoid tag redundancy
    }
  }
  
  // Add common high-performing Etsy tags - expanded to ensure we have enough
  const commonTags = [
    'handmade',
    'custom gift',
    'personalized',
    'unique gift',
    'gift idea',
    'one of a kind',
    'handcrafted',
    'made to order',
    'unique design',
    'quality product',
    'etsy bestseller',
    'trending item',
    'special gift',
    'gift for her',
    'gift for him',
    'perfect gift',
    'anniversary gift',
    'birthday gift',
    'holiday gift',
    'christmas gift',
    'holiday present',
    'bestselling item',
    'popular gift',
    'customizable',
    'handmade with love'
  ];
  
  // Add gift-related tags if "gift" is mentioned
  if (lowerDesc.includes('gift')) {
    potentialTags.push('gift for her');
    potentialTags.push('gift for him');
    potentialTags.push('special gift');
    potentialTags.push('thoughtful gift');
    potentialTags.push('perfect gift');
  }
  
  // Combine all tags
  const allTags = [...potentialTags, ...commonTags];
  
  // Deduplicate and clean tags, returning ALL possible matches from the description
  const uniqueTagsSet = new Set(allTags);
  const uniqueTags = Array.from(uniqueTagsSet)
    // Remove any commas or slashes, and ensure appropriate length
    .map(tag => tag.replace(/[,\/\\]/g, '').trim())
    // Ensure tags are reasonable length and not empty
    .filter(tag => tag.length > 0 && tag.length <= 80)
    // Sort by length (shortest first) for better readability
    .sort((a, b) => a.length - b.length);
  
  return uniqueTags;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Tag generation endpoint
  app.post("/api/generate-tags", async (req, res) => {
    try {
      const { description, category, style } = generateTagsSchema.parse(req.body);
      
      // Generate tags based on input
      const tags = generateTags(description, category, style);
      
      // Calculate a more accurate relevance score based on several factors
      // - Number of tags generated (max 13)
      // - Presence of category-specific tags
      // - Presence of specific keywords from the description
      // - Variety of tag types (single words, phrases, etc.)
      const tagCount = tags.length;
      const tagLengths = tags.map(tag => tag.split(' ').length);
      const tagVariety = Array.from(new Set(tagLengths)).length;
      const categoryMatches = category ? tags.filter(tag => tag.includes(category)).length : 0;
      
      // Extract words from description for keyword matching
      const descWords = description.toLowerCase().split(/\s+/);
      const keywordMatches = descWords.filter((word: string) => word.length > 4 && tags.some(tag => tag.includes(word))).length;
      
      // Calculate score based on these factors (weighted)
      const relevanceScore = Math.min(
        Math.round(
          (tagCount / 13) * 40 +         // 40% weight for tag count
          (tagVariety / 3) * 20 +        // 20% weight for variety of tag types
          (categoryMatches / 5) * 20 +   // 20% weight for category relevance
          (keywordMatches / 10) * 20     // 20% weight for keyword matching
        ), 
        99                               // Max score is 99
      );
      
      res.json({
        tags,
        relevanceScore
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to generate tags" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
