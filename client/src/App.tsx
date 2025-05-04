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