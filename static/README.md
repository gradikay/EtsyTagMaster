# Etsy SEO Tag Generator - Static Version

This is a fully static HTML/CSS/JavaScript version of the Etsy SEO Tag Generator that works completely offline. All tag generation logic is implemented in client-side JavaScript, eliminating the need for a server.

## Features

- **Completely Offline Operation**: All functionality works without an internet connection
- **No Server Dependencies**: Pure HTML, CSS, and JavaScript implementation
- **All Original Features**:
  - Tag generation from product descriptions
  - Category and style options
  - Adjustable tag quantity and word limits
  - Copy functionality for individual tags and all tags
  - Shareable links
  - Dark/light mode toggle
  - Responsive design for all devices

## How to Use

1. **Open the Application**: Simply open the `index.html` file in any modern browser
2. **Enter Product Description**: Type or paste your product description in the text area
3. **Set Options** (Optional):
   - Select a category from the dropdown
   - Enter a style description
   - Adjust the maximum number of tags (default: 13)
   - Set the maximum words per tag (default: 3)
4. **Generate Tags**: Click the "Generate Tags" button
5. **Use Your Tags**: 
   - Click on any tag to copy it individually
   - Use the "Copy All Tags" button to copy all tags at once
   - Create a shareable link with your current settings

## Technical Details

The tag generation algorithm:
1. Processes the product description by cleaning and normalizing text
2. Removes common words and very short words
3. Calculates word frequency and relevance
4. Generates combinations of words for multi-word tags
5. Ranks tags by relevance
6. Filters out duplicate and similar tags

## Files

- `index.html`: Main HTML file
- `styles.css`: All styling including dark/light mode theming
- `app.js`: JavaScript for tag generation logic and UI interactions
- `favicon.svg`: Application icon

## Customization

See the included `CUSTOMIZATION_GUIDE.md` in the parent directory for detailed instructions on changing colors, text, and other UI elements.

## License

For personal use only. All rights reserved.

---

Created for offline usage and personal projects.