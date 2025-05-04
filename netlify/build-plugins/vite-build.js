// Netlify Build Plugin to handle Vite builds

module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Setting up Vite build environment...');
  },
  
  onBuild: ({ utils }) => {
    console.log('Vite build completed successfully!');
    
    // Verify the build output directory exists
    try {
      const fs = require('fs');
      if (!fs.existsSync('dist/public')) {
        utils.build.failBuild('Build directory dist/public does not exist after build. Please check your build configuration.');
      } else {
        console.log('Build directory verified: dist/public exists.');
      }
    } catch (error) {
      utils.build.failBuild(`Error verifying build directory: ${error.message}`);
    }
  },
  
  onPostBuild: ({ utils }) => {
    console.log('Post-build processing complete.');
  }
};