
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnigdhaBirthday from "./pages/SnigdhaBirthday";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => {
  // Global dark mode state that can be passed down to all components
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check for dark mode preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Apply appropriate class
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Apply dark mode class to document for global styling
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <SnigdhaBirthday 
                    startPage="intro" 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                  />
                } 
              />
              <Route 
                path="/birthday" 
                element={
                  <SnigdhaBirthday 
                    startPage="celebration" 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
