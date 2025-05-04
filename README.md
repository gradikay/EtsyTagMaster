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

## 🚀 Deployment

### Netlify Deployment

This application is configured for easy deployment on Netlify:

1. Fork or clone this repository to your own GitHub account
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Netlify will automatically detect the build settings from netlify.toml
6. Click "Deploy site"

The application uses Netlify Functions to handle the backend API, so there's no need for additional server setup.

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