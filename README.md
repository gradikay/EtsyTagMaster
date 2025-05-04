# Etsy SEO Tag Generator

A powerful SEO tag generator tool for Etsy sellers to optimize their product listings. This application helps generate relevant tags from product descriptions to improve search visibility.

## Features

- **AI-Powered Tag Generation**: Generate relevant tags based on product descriptions
- **Category-Specific Optimization**: Tailor tags to specific Etsy categories
- **Style Customization**: Add style preferences to generate more targeted tags
- **Tag Relevance Score**: See how relevant your tags are to your product
- **Customizable Generation**: Control the number of tags and words per tag
- **Mobile-Friendly Design**: Fully responsive for use on any device
- **Dark/Light Mode**: Toggle between dark and light themes
- **Dynamic Animation**: Beautiful background animations that respond to the theme

## Deployment Instructions

### Deploying to Netlify

1. **Clone this repository to your local machine**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Build the application**
   ```
   npm run build
   ```

4. **Deploy to Netlify**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Connect to your Git provider and select the repository
   - Use the following build settings:
     - Build command: `vite build`
     - Publish directory: `dist/client`
   - Click "Deploy site"

Alternatively, you can use the Netlify CLI:
```
npx netlify deploy --prod
```

### Using the Application

1. Enter your product description in the text area
2. Select the appropriate Etsy category from the dropdown
3. (Optional) Add style preferences to tailor the tags
4. Set the maximum number of tags and words per tag
5. Click "Generate Tags" to create optimized SEO tags
6. Click on individual tags to copy them to your clipboard
7. Use the "Copy All Tags" button to copy all tags at once

## Local Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Visit `http://localhost:3000` in your browser

## License

MIT
