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
  const singleWords = words.filter(word => !commonWords.includes(word) && word.length > 3);
  
  // Extract phrases (2-3 words)
  for (let i = 0; i < words.length - 1; i++) {
    if (!commonWords.includes(words[i])) {
      phrases.push(`${words[i]} ${words[i+1]}`);
      if (i < words.length - 2) {
        phrases.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
      }
    }
  }
  
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
  
  // Deduplicate, filter by length, and get exactly 13 tags (Etsy max)
  const uniqueTagsSet = new Set(allTags);
  let uniqueTags = Array.from(uniqueTagsSet)
    // Remove any commas or slashes, and ensure appropriate length
    .map(tag => tag.replace(/[,\/\\]/g, '').trim())
    .filter(tag => tag.length > 0 && tag.length <= 20); // Etsy tag length limit
  
  // Ensure we always have 13 tags by adding additional tags if needed
  if (uniqueTags.length < 13) {
    // Add more generic, high-performing Etsy tags as backup
    const fallbackTags = [
      'handmade item',
      'gift under 50',
      'gift under 25',
      'gift under 100',
      'shop small',
      'small business',
      'handmade gift',
      'unique present',
      'gift idea',
      'gift for friend',
      'special occasion',
      'thoughtful gift',
      'etsy find',
      'new arrival',
      'bestseller',
      'trending now',
      'limited edition',
      'made with love',
      'handcrafted item'
    ];
    
    // Filter out any that are already in our tags
    const additionalTags = fallbackTags.filter(tag => !uniqueTags.includes(tag));
    
    // Add as many as needed to reach exactly 13 tags
    uniqueTags = [...uniqueTags, ...additionalTags.slice(0, 13 - uniqueTags.length)];
  }
  
  // Final trim to exactly 13 tags
  uniqueTags = uniqueTags.slice(0, 13);
  
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
