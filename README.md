# Etsy SEO Tag Generator

![Hero Image](./generated-icon.png)

A powerful, modern web application designed to help Etsy sellers optimize their product listings with intelligent tag generation. This application extracts highly relevant keywords from product descriptions and generates optimized tags with maximum relevance scores.

## ✨ Features

- **AI-Powered Tag Generation**: Intelligent analysis of product descriptions to extract the most relevant tags
- **Maximum Relevance**: All tags score 99/99 for maximum search visibility
- **Customizable Controls**:
  - Adjust the maximum number of tags to generate (default: 13)
  - Control maximum words per tag (default: 3)
- **Smart Processing**:
  - Removes special characters while preserving word separation
  - Filters and ranks words based on relevance
- **Intuitive UI**:
  - One-click copy functionality for individual tags
  - "Copy All Tags" button for convenience
  - Visual feedback on successful copy
- **Shareable Results**:
  - Generate shareable links with your current tags and settings
  - Easy collaboration with team members
- **Modern Design**:
  - Sleek, futuristic interface with glass-like UI elements
  - Responsive layout for all devices
  - Dark and light mode with animated backgrounds
  - Category selection with unique, colorful icons

## 🚀 Live Demo

Try the app: [Etsy SEO Tag Generator](https://etsy-tag-generator.replit.app)

## 🚀 Deployment (Netlify)

This application is ready for deployment on Netlify:

1. Fork or clone this repository
2. Log in to [Netlify](https://netlify.com)
3. Click **“New site from Git”**
4. Select your GitHub repository
5. Netlify will auto-detect build settings from `netlify.toml`
6. Click **“Deploy site”**

No additional server setup required — Netlify Functions are used for backend logic.

## 💻 Technology Stack

### Frontend

- React 18 + TypeScript
- TailwindCSS for styling
- shadcn/ui components
- Framer Motion for animations
- Responsive design with mobile support

### Backend

- Node.js with Express
- RESTful API architecture
- Intelligent tag generation logic
- Netlify Functions for serverless deployment

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/etsy-tag-generator.git
cd etsy-tag-generator
npm install  # or yarn install
npm run dev  # or yarn dev
