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
  const commonWords = ['a', 'the', 'and', 'or', 'but', 'for', 'with', 'in', 'on', 'at', 'to', 'of'];
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
  
  // Add category and style if provided
  if (category) {
    potentialTags.push(category);
    potentialTags.push(`${category} gift`);
  }
  
  if (style) {
    potentialTags.push(style);
    potentialTags.push(`${style} ${category || ''}`);
  }
  
  // Add some common Etsy-specific tags
  potentialTags.push('handmade');
  potentialTags.push('custom gift');
  potentialTags.push('personalized');
  
  if (lowerDesc.includes('gift')) {
    potentialTags.push('gift for her');
    potentialTags.push('gift for him');
    potentialTags.push('unique gift');
    potentialTags.push('birthday gift');
    potentialTags.push('anniversary gift');
  }
  
  // Deduplicate and get max 20 tags
  const uniqueTags = [...new Set(potentialTags)]
    .filter(tag => tag.length > 0 && tag.length <= 20) // Etsy tag length limit
    .slice(0, 20);
  
  return uniqueTags;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Tag generation endpoint
  app.post("/api/generate-tags", async (req, res) => {
    try {
      const { description, category, style } = generateTagsSchema.parse(req.body);
      
      // Generate tags based on input
      const tags = generateTags(description, category, style);
      
      // Calculate a "relevance score" (this is just for demo purposes)
      const relevanceScore = Math.min(Math.floor(description.length / 5) + 50, 98);
      
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
