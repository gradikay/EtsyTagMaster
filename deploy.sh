#!/bin/bash

# Etsy SEO Tag Generator - Deployment Script

echo "📦 Starting deployment process..."

# Build the application
echo "🔨 Building the application..."
vite build

# Check if the build was successful
if [ ! -d "dist/public" ]; then
  echo "❌ Build failed. The dist/public directory was not created."
  exit 1
fi

echo "✅ Build completed successfully!"
echo "📊 Build statistics:"
echo "   - JS: $(du -h dist/public/assets/*.js | awk '{print $1}')"
echo "   - CSS: $(du -h dist/public/assets/*.css | awk '{print $1}')"
echo "   - HTML: $(du -h dist/public/index.html | awk '{print $1}')"

echo ""
echo "🚀 Ready for deployment!"
echo "You can now deploy using one of these methods:"
echo ""
echo "1. Manual deployment to Netlify:"
echo "   - Log in to your Netlify account"
echo "   - Go to Sites > Add new site > Import an existing project"
echo "   - Connect to your Git provider"
echo "   - Select your repository"
echo "   - Use the build settings from netlify.toml"
echo ""
echo "2. Deploy using Netlify CLI:"
echo "   npm install -g netlify-cli"
echo "   netlify login"
echo "   netlify deploy --prod"
echo ""
echo "3. Download the dist/public folder and upload manually:"
echo "   - Compress the dist/public folder"
echo "   - Download the archive"
echo "   - Upload to your hosting provider"
echo ""

# Provide option to compress dist folder for manual download
read -p "Would you like to create a compressed archive of the dist folder for download? (y/n): " create_archive

if [ "$create_archive" = "y" ] || [ "$create_archive" = "Y" ]; then
  echo "📁 Creating archive of dist/public folder..."
  tar -czf etsy-tag-generator-dist.tar.gz -C dist public
  echo "✅ Archive created: etsy-tag-generator-dist.tar.gz"
  echo "   You can now download this file and upload it to your hosting provider."
fi

echo ""
echo "🎉 Deployment setup complete!"