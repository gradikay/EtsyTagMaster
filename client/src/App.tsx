import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";

// Create a query client
const queryClient = new QueryClient();

// Background Animation Component
const BackgroundAnimation = ({ customColors }: { customColors?: { color1?: string; color2?: string; color3?: string } }) => {
  // Set up any custom CSS variables from props if provided
  useEffect(() => {
    if (customColors) {
      const root = document.documentElement;
      
      if (customColors.color1) {
        root.style.setProperty('--bg-animation-color-1', customColors.color1);
      }
      
      if (customColors.color2) {
        root.style.setProperty('--bg-animation-color-2', customColors.color2);
      }
      
      if (customColors.color3) {
        root.style.setProperty('--bg-animation-color-3', customColors.color3);
      }
    }
  }, [customColors]);

  return (
    <div className="bg-animation-container">
      <div className="bg-animation-shape"></div>
      <div className="bg-animation-shape"></div>
      <div className="bg-animation-shape"></div>
    </div>
  );
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // You can customize colors here or through a settings interface later
  const [animationColors] = useState({
    color1: 'rgba(99, 102, 241, 0.05)', // Default indigo color
    color2: 'rgba(139, 92, 246, 0.05)', // Default purple color
    color3: 'rgba(236, 72, 153, 0.05)', // Default pink color
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BackgroundAnimation customColors={animationColors} />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;