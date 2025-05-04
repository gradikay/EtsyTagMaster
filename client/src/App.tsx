import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";

// Create a query client
const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Animated Background Component
function AnimatedBackground() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Create animated hexagons
  useEffect(() => {
    // Create and add animated hexagons
    const hexContainer = document.createElement('div');
    hexContainer.className = 'animated-hexagons';
    
    // Create 20 animated hexagons
    for (let i = 0; i < 20; i++) {
      const hexagon = document.createElement('div');
      
      // Random starting positions
      hexagon.style.left = `${Math.random() * 100}%`;
      hexagon.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      hexagon.style.animationDelay = `${Math.random() * 5}s`;
      
      hexContainer.appendChild(hexagon);
    }
    
    // Add to the background
    const backgroundEl = document.querySelector('.animated-background');
    if (backgroundEl) {
      backgroundEl.appendChild(hexContainer);
    }
    
    // Cleanup
    return () => {
      if (backgroundEl && backgroundEl.contains(hexContainer)) {
        backgroundEl.removeChild(hexContainer);
      }
    };
  }, []);
  
  // Listen for changes to the light/dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(!document.body.classList.contains('light-mode'));
    };
    
    // Check on initial render
    checkTheme();
    
    // Create a mutation observer to watch for class changes on the body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    // Start observing the body element
    observer.observe(document.body, { attributes: true });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="animated-background">
      {isDarkMode ? (
        <div className="stars"></div>
      ) : (
        <div className="light-anim"></div>
      )}
      {/* Hexagons will be added via useEffect */}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatedBackground />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;