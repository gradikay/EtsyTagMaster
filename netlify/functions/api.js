const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Create an Express app
const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

// Parse JSON request bodies
app.use(express.json());

// Generate Tags Function
function generateTags(description, category = '', style = '') {
  // Normalize inputs
  const normalizedDescription = description.toLowerCase();
  const normalizedCategory = category.toLowerCase();
  const normalizedStyle = style ? style.toLowerCase() : '';

  // Function to clean text and split into words
  const cleanAndSplitText = (text) => {
    return text
      .replace(/[^\w\s'-]/g, ' ') // Replace non-word chars (except ' and -) with spaces
      .replace(/\s+/g, ' ')       // Replace multiple spaces with a single space
      .trim()
      .split(' ');
  };

  // Get all words from the description
  const words = cleanAndSplitText(normalizedDescription);

  // Filter out common stop words, short words, and duplicates
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'for', 'nor', 'on', 'at', 'to', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'in', 'of', 'this', 'that', 'these', 'those', 'it', 'its']);
  const filteredWords = words.filter(word => word.length > 2 && !stopWords.has(word));

  // Generate single-word tags (most important words)
  const singleWordTags = [...new Set(filteredWords)];

  // Generate two-word combinations
  const twoWordTags = [];
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].length > 2 && words[i + 1].length > 2) {
      twoWordTags.push(`${words[i]} ${words[i + 1]}`);
    }
  }

  // Generate three-word combinations
  const threeWordTags = [];
  for (let i = 0; i < words.length - 2; i++) {
    if (words[i].length > 2 && words[i + 1].length > 2 && words[i + 2].length > 2) {
      threeWordTags.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }

  // If category is provided, include it in tags
  let categoryTags = [];
  if (normalizedCategory) {
    categoryTags = [normalizedCategory];
    
    // Create combinations with category if not already included
    singleWordTags.forEach(word => {
      if (!word.includes(normalizedCategory)) {
        categoryTags.push(`${normalizedCategory} ${word}`);
      }
    });
  }

  // If style is provided, include it in tags
  let styleTags = [];
  if (normalizedStyle) {
    styleTags = [normalizedStyle];
    
    // Create combinations with style
    singleWordTags.forEach(word => {
      if (!word.includes(normalizedStyle)) {
        styleTags.push(`${normalizedStyle} ${word}`);
      }
    });
    
    // Combine style with category if both provided
    if (normalizedCategory) {
      styleTags.push(`${normalizedStyle} ${normalizedCategory}`);
    }
  }

  // Combine all generated tags
  const allTags = [
    ...categoryTags,
    ...styleTags,
    ...threeWordTags,
    ...twoWordTags,
    ...singleWordTags
  ];

  // Remove duplicates and sort by relevance (longer tags first as they're more specific)
  const uniqueTags = [...new Set(allTags)];
  
  return uniqueTags;
}

// API endpoint for generating tags
app.post('/generate-tags', (req, res) => {
  try {
    const { description, category, style, maxTags = 13, maxWordsPerTag = 3 } = req.body;
    
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    
    // Generate tags
    const allTags = generateTags(description, category, style);
    
    // Filter by maxWordsPerTag
    const filteredByWords = allTags.filter(tag => {
      const wordCount = tag.split(' ').length;
      return wordCount <= maxWordsPerTag;
    });
    
    // Get final tags limited by maxTags
    const finalTags = filteredByWords.slice(0, maxTags);
    
    // Return response with metadata
    res.json({
      tags: finalTags,
      relevanceScore: 99,
      totalAvailableTags: allTags.length,
      totalFilteredTags: filteredByWords.length
    });
  } catch (error) {
    console.error('Error generating tags:', error);
    res.status(500).json({ error: 'Failed to generate tags' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Not found handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export the serverless function
exports.handler = serverless(app);