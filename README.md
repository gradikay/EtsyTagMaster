# Etsy SEO Tag Generator

![Hero Image](./generated-icon.png)

A powerful, modern web application designed to help Etsy sellers optimize their product listings with intelligent tag generation. This application extracts highly relevant keywords from product descriptions and generates optimized tags with maximum relevance scores.

## ✨ Features

- **AI-Powered Tag Generation**: Intelligent analysis of product descriptions to extract the most relevant tags
- **Maximum Relevance**: All tags score 99/99 for maximum search visibility
- **Customizable Controls**:
  - Adjust maximum number of tags to generate (default: 13)
  - Control maximum words per tag (default: 3)
- **Smart Processing**:
  - Special character removal while preserving word separation
  - Intelligent word filtering and relevance ranking
- **Intuitive UI**:
  - One-click copy functionality for individual tags
  - "Copy All Tags" button for convenience
  - Visual feedback when copying tags
- **Shareable Results**:
  - Generate shareable links with your current tags and settings
  - Easy collaboration with team members
- **Modern Design**:
  - Sleek, futuristic interface with glass-like UI elements
  - Responsive layout for all devices
  - Dark and light mode with beautiful animated backgrounds
  - Category selection with unique, colorful icons

## 🚀 Live Demo

You can try the application here: [Etsy SEO Tag Generator](https://etsy-tag-generator.replit.app)

## 💻 Technology Stack

- **Frontend**:
  - React 18 with TypeScript
  - TailwindCSS for styling
  - shadcn/ui components
  - Responsive design with mobile support
  - Framer Motion for animations

- **Backend**:
  - Node.js with Express
  - RESTful API architecture
  - Intelligent tag generation algorithm

## 📁 Static Version

A completely offline, static HTML/CSS/JavaScript version of the application is available in the `/static` directory. This version:

- Works 100% offline with no server or dependencies
- Includes all core features of the main application
- Runs in any modern web browser by simply opening the HTML file
- Generates tags entirely client-side with JavaScript

To use the static version:
1. Navigate to the `/static` directory
2. Open `index.html` in any web browser
3. No installation, servers, or internet connection required!

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/etsy-tag-generator.git
   cd etsy-tag-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## 🔧 Configuration

The application can be configured through the following environment variables:

- `PORT`: The port on which the server runs (default: 5000)

## 🎨 Customization

For detailed instructions on how to customize the colors and text of this application, see the [Customization Guide](./CUSTOMIZATION_GUIDE.md).

You can modify:
- Color schemes (gradients, backgrounds, UI elements)
- Text content (headings, labels, button text)
- UI elements (icons, animations)
- Responsive design settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for personal use only. All rights reserved.

## 🙏 Acknowledgements

- [Replit](https://replit.com) - Development platform
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [React](https://reactjs.org/) - Frontend library

---

Made with ❤️ for Etsy sellers